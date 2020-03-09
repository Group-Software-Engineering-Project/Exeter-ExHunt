const express = require('express');
const leaderboardsViewer = express.Router();
const mongoose = require('mongoose');
const Tracks = require('../models/tracks');

leaderboardsViewer.get('/', function(req, res, next) {
    res.render('leaderboardsPage', { title: 'Leaderboards'})
});

module.exports = leaderboardsViewer;