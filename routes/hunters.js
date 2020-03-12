var express = require('express');
var router = express.Router();
const Tracks = require('../models/tracks');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Routed to the hunter track choosing page
router.get('/', function(req, res, next) {
  // Query the database for the playable tracks
  Tracks.find({},"creator name number_of_challenges track_ranking",function(err,tracks){
    res.render('hunter/hunters', {challenges:2,tracks:tracks});
  });
});

// form is posted when a user choose a track
router.post('/choose_track',urlencodedParser, function(req,res){
  Tracks.find({name:req.body.track_name},function(err,track){
    // track is saved in the session variables, and the app redirects to the main game loop
    req.session.hunter_track = track[0];
    req.session.progress = "start";
    res.redirect('/track_loop');
  });

});


module.exports = router;