var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const GridFsStorage = require('multer-gridfs-storage');
const grid = require('gridfs-stream');
const Challenges = require('../models/challenges');
const Tracks = require('../models/tracks');
var User = require('../models/user');
const fs = require('fs');

var currentTrack;
var x = 0;
var questions;
var currentquestion = 0;
var fromar = false;

const conn = mongoose.createConnection('mongodb://LucasMartinCalderon:LucasMartinCalderon123@ds046677.mlab.com:46677/exhunt');

// read the JSON file containing all questions
fs.readFile('questions.json', (err, data) => {
  questions = JSON.parse(data);
  console.log(questions.questions.length);
});


let gfs;

// connect to the mongoDB for gridfs
conn.once('open', () => {
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// check if user has a saved location/challenge for this track
router.get('/', function (req, res) {
  User.findOne({ username: req.session.currentUser.username }, function (err, user) {
    if (user.track_name == req.session.hunter_track.name) {
      x = user.challenge_level;
      console.log("continue");
    }
    else {
      x = 0;
    }
    res.redirect('/track_loop/loop');
  });
});



// main loop
router.get('/loop', function (req, res) {
  currentTrack = req.session.hunter_track;
  // check if the app is being redirected from the AR page
  if (fromar == true) {
    gfs.files.findOne({ _id: mongoose.Types.ObjectId(currentTrack.challenges[x - 1].Vid2ID) }, (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
      else {
        fromar=false;
        res.render('hunter/hunter_loop', { files: file, question: questions.questions[currentquestion], coords: currentTrack.challenges[x].Location, fromAR: true });
      }
    })
  }
  else {
    // set the user's saved track as the current track
    User.updateOne({ username: req.session.currentUser.username }, { track_name: currentTrack.name }).then(result => {
      console.log(result);
    });
    // find the videos in the database
    gfs.files.find({ _id: { $in: [mongoose.Types.ObjectId(currentTrack.challenges[x].Vid1ID), mongoose.Types.ObjectId(currentTrack.challenges[x].Vid2ID)] } }).toArray((err, file) => {
      // Check if files
      if (!file || file.length === 0) {
        res.render('hunter/hunter_loop', {})
      }
      else {
        // displays a slightly different page when the user reaches the end of the track
        if (x == currentTrack.number_of_challenges) {
          // resets the user's saved track and position
          User.updateOne({ username: req.session.currentUser.username }, { track_name: "", challenge_level: 0 }).then(result => {
            res.render('hunter/hunter_loop', { files: file, end: true, question: questions.questions[0], fromAR: false });
          });

        }
        else {
          while (true) {
            // get a random question which is not the same as the previous one
            var random = getRandomInt();
            if (random != currentquestion) {
              currentquestion = random;
              break;
            }
          }

          // save the user's location in the current track
          User.updateOne({ username: req.session.currentUser.username }, { challenge_level: x }).then(result => {
            x++;
            console.log(file[0].filename);
            console.log("x is " + x);
            console.log(currentTrack.challenges[x].Location);
            res.render('hunter/hunter_loop', { files: file, end: false, question: questions.questions[currentquestion], coords: currentTrack.challenges[x].Location, fromAR: false });
          });
        }
      }
    });
  }

});

// route to display video1
router.get('/track_loop/video1/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // If File exists this will get executed
    const readstream = gfs.createReadStream(file.filename);
    return readstream.pipe(res);
  });
});

// route to display video2
router.get('/track_loop/video2/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // If File exists this will get executed
    const readstream = gfs.createReadStream(file.filename);
    return readstream.pipe(res);
  });
});

// routes to the AR page
router.get('/ar', (req, res) => {
  res.render('hunter/ar');
})

//route from the AR page, ensures the user is returned to the correct part in the loop, so they don't need to answer the challenge question again
router.get('/back', (req, res) => {
  fromar = true;
  console.log(x)
  res.redirect('/track_loop/loop');
});

function getRandomInt() {
  return Math.floor(Math.random() * Math.floor(22));
}

module.exports = router;