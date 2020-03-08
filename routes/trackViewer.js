var express = require('express');
var trackViewer = express.Router();
var passport = require('passport');
const mongoose = require('mongoose');
const Tracks = require('../models/tracks');
var username;
var displaytracks;

trackViewer.get('/', function(req, res, next) {
    if (req.session.currentUser == undefined || req.session.currentUser.role == 'Hunter') {
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

module.exports = trackViewer;