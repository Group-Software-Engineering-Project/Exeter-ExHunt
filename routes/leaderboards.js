const express = require('express');
const leaderboardsViewer = express.Router();
const mongoose = require('mongoose');
const Tracks = require('../models/tracks');
const User = require("../models/user");
var tracksTable;
var usersTable;

leaderboardsViewer.get('/', function(req, res, next) {
    Tracks.find({},"creator name track_ranking",function(err,tracks){
        console.log(tracks);
        tracksTable = tracks;
    })
    User.find({role:"Hunter"},"username track_hunter_ranking",function(err,users){
        console.log(users);
        usersTable = users;
    })
    res.render('leaderboardsPage', { title: 'Leaderboards', tracksTable, usersTable});
});

module.exports = leaderboardsViewer;