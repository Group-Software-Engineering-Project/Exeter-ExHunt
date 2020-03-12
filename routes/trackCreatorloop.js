var express = require('express');
var trackCreator = express.Router();
const mongoose = require('mongoose');
const GridFsStorage = require('multer-gridfs-storage');
const grid = require('gridfs-stream');
const Challenges = require('../models/challenges');
const Tracks = require('../models/tracks');


var multer = require('multer');


const conn = mongoose.createConnection('mongodb://LucasMartinCalderon:LucasMartinCalderon123@ds046677.mlab.com:46677/exhunt');

let gfs;

// connect to database for gridfs
conn.once('open', () => {
    gfs = grid(conn.db,mongoose.mongo);
    gfs.collection('uploads');
});

// storage of files by gridfs
const storage = new GridFsStorage({
    url: 'mongodb://LucasMartinCalderon:LucasMartinCalderon123@ds046677.mlab.com:46677/exhunt',
    file: (req,file) => {
        return new Promise((resolve,reject) => {
            const filename = file.originalname;
            const fileInfo = {
                filename: filename,
                bucketName: 'uploads'
            };
            resolve(fileInfo)
        });
    }
});

const upload = multer({storage});

var username;
var track;
var number_of_challenges = 1000;
var x = 0;

// renders intial track creation setup
trackCreator.get('/', function(req, res) {
    x=0;
    number_of_challenges=1000
    if (req.session.currentUser == undefined || req.session.currentUser.role == 'Hunter') {
        res.redirect('/login')
      }
      else {
        username = req.session.currentUser.username;
        res.render('creator/challenge_loop', { title: 'challenge_loop',heading:'Intro', x:x, num_challenges:number_of_challenges, username: username, message:""});
      }
    
});

// main track creation loop
trackCreator.post('/upload',upload.any(),function(req,res){
    if (x ==0) {
        number_of_challenges = req.body.num_challenges;
        var tName = req.body.tName;
        console.log(number_of_challenges);
        console.log(tName);
        console.log(req.files);
        // checks if track name is already taken
        Tracks.findOne( {name:tName} , "name", (err, Name) => {
            if (Name !== null) {
                console.log(Name);
                res.render('creator/challenge_loop.ejs', {title: 'challenge_loop',heading:"Intro",x:x,num_challenges:number_of_challenges, username: username,message:"*Name already taken"});
              return;
            }
            else {
                track = createTrack(tName, username,number_of_challenges);
                track = createChallenge(track,track._id,req.files[0].id,req.files[1].id,[0,0]);
                x++;
                res.render('creator/challenge_loop.ejs', {title: 'challenge_loop',heading:`Location ${x}`,x:x,num_challenges:number_of_challenges, username: username,message:""});
            }
        });
    }
    // display outro creation page
    else if (x==number_of_challenges-1) {
        track = createChallenge(track,track._id,req.files[0].id,req.files[1].id,[req.body.x,req.body.y]);
        x++;
        res.render('creator/challenge_loop.ejs', {title: 'challenge_loop',heading:'Last Location',x:x,num_challenges:number_of_challenges, username: username,message:""});
    }
    // save the track at the end of creation, and render page to return to creator start page
    else if (x==number_of_challenges) {
        track = createChallenge(track,track._id,req.files[0].id,req.files[1].id,[req.body.x,req.body.y]);
        track.save();
        if (req.session.currentUser == undefined || req.session.currentUser.role == 'Hunter') {
            res.redirect('/login')
          }
          else {
            res.render('creator/finish_creation.ejs', {username: username});
          }
    }
    else {
        // render challenge creation pages
        track = createChallenge(track,track._id,req.files[0].id,req.files[1].id,[req.body.x,req.body.y]);
        x++;
        res.render('creator/challenge_loop.ejs', {title: 'challenge_loop',heading:`Location ${x}`,x:x,num_challenges:number_of_challenges, username: username,message:""});
    }
    
});

// create track document to be saved at the end of creation
function createTrack(name,creator,num_challenges) {
    var track = new Tracks({
        name: name,
        creator: creator,
        number_of_challenges: num_challenges,
        challenges: [], 
        track_ranking: 0,
        number_of_plays: 0
    });
    return track;
};

// create challenge object from schema, and push to the created track document
function createChallenge(Track,TrackID, Vid1, Vid2,locations) {
    var challenge = new Challenges.challengeModel({
        TrackID: TrackID,
        Location: [locations[0],locations[1]],
        Vid1ID: Vid1,
        Vid2ID: Vid2
    });
    Track.challenges.push(challenge)

    return Track;
}

module.exports = trackCreator;