var express = require('express');
var trackCreator = express.Router();
const mongoose = require('mongoose');
const GridFsStorage = require('multer-gridfs-storage');
const grid = require('gridfs-stream');
const Challenges = require('../models/challenges');
const Tracks = require('../models/tracks');


var multer = require('multer');
var fs = require('fs');


const conn = mongoose.createConnection('mongodb://localhost/exhunt');

let gfs;

conn.once('open', () => {
    gfs = grid(conn.db,mongoose.mongo);
    gfs.collection('uploads');
});

const storage = new GridFsStorage({
    url: 'mongodb://localhost/exhunt',
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

var track;
var number_of_challenges = 1000;
var x = 0;
trackCreator.get('/', function(req, res) {
    x=0;
    number_of_challenges=1000
    res.render('creator/challenge_loop', { title: 'challenge_loop',heading:'Intro', x:x, num_challenges:number_of_challenges});
});


trackCreator.post('/upload',upload.any(),function(req,res){
    if (x ==0) {
        number_of_challenges = req.body.num_challenges;
        var tName = req.body.tName;
        console.log(number_of_challenges);
        console.log(tName);
        console.log(req.files);
        track = createTrack(tName,'rjem201',number_of_challenges);
        track = createChallenge(track,track._id,req.files[0].id,req.files[1].id,[0,0]);
        x++;
        res.render('creator/challenge_loop.ejs', {title: 'challenge_loop',heading:`Location ${x}`,x:x,num_challenges:number_of_challenges});
    }
    else if (x==number_of_challenges-1) {
        console.log([req.body.x,req.body.y]);
        console.log(req.files);
        track = createChallenge(track,track._id,req.files[0].id,req.files[1].id,[req.body.x,req.body.y]);
        x++;
        res.render('creator/challenge_loop.ejs', {title: 'challenge_loop',heading:'Last Location',x:x,num_challenges:number_of_challenges});
    }
    else if (x==number_of_challenges) {
        console.log([req.body.x,req.body.y]);
        console.log(req.files);
        track = createChallenge(track,track._id,req.files[0].id,req.files[1].id,[req.body.x,req.body.y]);
        track.save();
        res.render('creator/finish_creation.ejs');
    }
    else {
        console.log([req.body.x,req.body.y]);
        console.log(req.files);
        track = createChallenge(track,track._id,req.files[0].id,req.files[1].id,[req.body.x,req.body.y]);
        x++;
        res.render('creator/challenge_loop.ejs', {title: 'challenge_loop',heading:`Location ${x}`,x:x,num_challenges:number_of_challenges});
    }
    
});

function createTrack(name,creator,num_challenges) {
    var track = new Tracks({
        name: name,
        creator: creator,
        number_of_challenges: num_challenges,
        challenges: []
    });
    console.log(track);
    return track;
};

function createChallenge(Track,TrackID, Vid1, Vid2,locations) {
    var challenge = new Challenges.challengeModel({
        TrackID: TrackID,
        Location: [locations[0],locations[1]],
        Vid1ID: Vid1,
        Vid2ID: Vid2
    });
    Track.challenges.push(challenge)
    console.log(challenge);
    return Track;
}

module.exports = trackCreator;