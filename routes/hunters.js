var express = require('express');
var router = express.Router();
const Tracks = require('../models/tracks');


router.get('/', function(req, res, next) {
  Tracks.find({},"creator name number_of_challenges track_ranking",function(err,tracks){
    console.log(tracks)
    res.render('hunter/hunters', {challenges:2,tracks:tracks});
  });
});



module.exports = router;