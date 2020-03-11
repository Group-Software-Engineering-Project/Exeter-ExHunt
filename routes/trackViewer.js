const express = require('express');
const trackViewer = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const Tracks = require('../models/tracks');

trackViewer.get('/', function(req, res, next) {
    if (req.session.currentUser == undefined || req.session.currentUser.role == 'Hunter') {
        res.redirect('/login')
    }
    else {
        const username = req.session.currentUser.username;
        Tracks.find({creator:username},"creator name number_of_challenges track_ranking number_of_plays",function(err,tracks){
            res.render('creator/view_track', { title: 'Track Viewer', username: username, tracks: tracks});
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