var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const GridFsStorage = require('multer-gridfs-storage');
const grid = require('gridfs-stream');
const Challenges = require('../models/challenges');
const Tracks = require('../models/tracks');

var currentTrack;
var x = 0;

const conn = mongoose.createConnection('mongodb://localhost/exhunt');

let gfs;

conn.once('open', () => {
    gfs = grid(conn.db,mongoose.mongo);
    gfs.collection('uploads');
});


router.get('/',function(req,res){
    x=0;
    //console.log(req.session)
    currentTrack = req.session.hunter_track;
    //console.log(typeof currentTrack.challenges[x].Vid1ID);
    gfs.files.findOne({_id:mongoose.Types.ObjectId(currentTrack.challenges[x].Vid1ID)},(err, file) => {
        // Check if files
        if (!file || file.length === 0) {
            console.log("FUCK");
            res.render('hunter/hunter_loop');
        }
        else {
            console.log(file);
            if (file.contentType == 'image/jpeg' || file.contentType === 'image/png') {
                res.render('hunter/hunter_loop',{file:file,isImage:true});
            }
            else {
                res.render('hunter/hunter_loop',{file:file,isImage:false});
            }
            
        }
      });
});

router.get('/image/:filename', (req, res) => {
    console.log("image");
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if the input is a valid image or not
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
  
      // If the file exists then check whether it is an image
      if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
        // Read output to browser
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      } else {
        res.status(404).json({
          err: 'Not an image'
        });
      }
    });
  });

router.get('/video/:filename', (req, res) => {
    console.log("vid");
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

module.exports = router;