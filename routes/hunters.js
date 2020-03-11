// routes/hunters.js
var express = require('express');
var router = express.Router();

// Tracks model
const Tracks = require('../models/tracks');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// view track info
router.get('/', function(req, res, next) {
  Tracks.find({},"creator name number_of_challenges track_ranking",function(err,tracks){
    res.render('hunter/hunters', {challenges:2,tracks:tracks});
  }).sort([['track_ranking', -1]]);
});

// hunter track choice
router.post('/choose_track',urlencodedParser, function(req,res){
  Tracks.findOne({name:req.body.track_name},function(err,track){
    req.session.hunter_track = track;
    res.redirect('/track_loop');
  });

});


module.exports = router;