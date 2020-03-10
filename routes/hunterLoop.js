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

//

router.get('/',function(req,res){
    currentTrack = req.session.hunter_track;
    gfs.files.find({_id: { $in : [mongoose.Types.ObjectId(currentTrack.challenges[x].Vid1ID),mongoose.Types.ObjectId(currentTrack.challenges[x].Vid2ID)]}}).toArray((err,file)=>{
        // Check if files
        if (!file || file.length === 0) {
          res.render('hunter/hunter_loop',{})
        }
        else {
            if (x==currentTrack.number_of_challenges) {

              res.render('hunter/hunter_loop',{files:file,end:true});
            }
            else {
              x++;
              console.log(x);
              res.render('hunter/hunter_loop',{files:file,end:false});
            }
            
            
        }
      });

});

router.get('/video/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
      // If File exists this will get executed
      console.log("plese work");
      const readstream = gfs.createReadStream(file.filename);
      return readstream.pipe(res);
    });
  });




module.exports = router;