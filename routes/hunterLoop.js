var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const GridFsStorage = require('multer-gridfs-storage');
const grid = require('gridfs-stream');
const Challenges = require('../models/challenges');
const Tracks = require('../models/tracks');
const User = require('../models/user');
const fs = require('fs');

var currentTrack;
var x;
var questions;
var currentquestion=0;

fs.readFile('questions.json', (err,data) => {
  questions = JSON.parse(data);
  console.log(questions.questions.length);
});

const conn = mongoose.createConnection('mongodb://localhost/exhunt');

let gfs;

conn.once('open', () => {
    gfs = grid(conn.db,mongoose.mongo);
    gfs.collection('uploads');
});

router.get('/',function(req,res){
  User.findOne({username:req.session.currentUser.username},function(err,user){
    if(user.track_name==req.session.hunter_track.name){
      x=user.challenge_level;
      console.log("continue");
    }
    else {
      x=0;
    }
    res.redirect('/track_loop/loop');
  });
});


router.get('/loop',function(req,res){
    currentTrack = req.session.hunter_track;
      User.updateOne({username:req.session.currentUser.username},{track_name:currentTrack.name}).then(result=>{
        console.log(result);
      });
      gfs.files.find({_id: { $in : [mongoose.Types.ObjectId(currentTrack.challenges[x].Vid1ID),mongoose.Types.ObjectId(currentTrack.challenges[x].Vid2ID)]}}).toArray((err,file)=>{
        // Check if files
        if (!file || file.length === 0) {
          res.render('hunter/hunter_loop',{})

        }
        else {
          if (x==currentTrack.number_of_challenges) {
            User.updateOne({username:req.session.currentUser.username},{track_name:"",challenge_level:0}).then(result=>{
              res.render('hunter/hunter_loop',{files:file,end:true,question:questions.questions[0]});
            });
            
          }
          else {
            while(true){
              var random = getRandomInt();
              if (random!=currentquestion){
                currentquestion=random;
                break;
              }
            }
            
            //console.log(file);
            User.updateOne({username:req.session.currentUser.username},{challenge_level:x}).then(result=>{
              x++;
              console.log("x is "+x);
              console.log(currentTrack.challenges[x-1].Location);
              res.render('hunter/hunter_loop',{files:file,end:false,question:questions.questions[currentquestion],coords:currentTrack.challenges[x-1].Location});
            });
          }
      }
    });
});

router.get('/track_loop/video/:filename', (req, res) => {
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

function getRandomInt() {
  return Math.floor(Math.random() * Math.floor(22));
}


module.exports = router;