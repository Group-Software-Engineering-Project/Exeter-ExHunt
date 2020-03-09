const express = require('express');
const leaderboardsViewer = express.Router();
const mongoose = require('mongoose');
const Tracks = require('../models/tracks');
const User = require("../models/user");

leaderboardsViewer.get('/', function(req, res, next) {
    Tracks.find({},"creator name track_ranking",function(err,tracks){
        User.find({role:"Hunter"},"username track_hunter_ranking",function(err,users){
            res.render('leaderboardsPage', { title: 'Leaderboards', tracks, users});
        }).sort([['track_hunter_ranking', -1]]);
    }).sort([['track_ranking', -1]]);
});

module.exports = leaderboardsViewer;