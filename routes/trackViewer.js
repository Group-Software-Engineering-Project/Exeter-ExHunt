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
        Tracks.find({creator:username},"creator name number_of_challenges",function(err,tracks){
            console.log(tracks);
            res.render('creator/view_track', { title: 'Track Viewer', username: username, tracks: tracks});
        });
    }
});

module.exports = trackViewer;