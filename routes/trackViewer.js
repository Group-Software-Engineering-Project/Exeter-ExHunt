var express = require('express');
var trackViewer = express.Router();
var passport = require('passport');
const mongoose = require('mongoose');
const Tracks = require('../models/tracks');
var username;
var displaytracks;

trackViewer.get('/', function(req, res, next) {
    if (req.session.currentUser == undefined) {
        res.redirect('/login')
    }
    else{
        const username = req.session.currentUser.username;
        Tracks.find({creator:username},"creator name number_of_challenges track_ranking",function(err, element){
            element.forEach(a => console.log(a.track_ranking));
            res.render('creator/view_track', { title: 'Track Viewer', username: username, tracks: element});
        });
    }
});

trackViewer.post('/:id/delete', (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    Tracks.findByIdAndDelete(id, (err, track) => {
        if (err) { return next(err); }
        return res.redirect('/view_track');
      });
  });

module.exports = trackViewer;