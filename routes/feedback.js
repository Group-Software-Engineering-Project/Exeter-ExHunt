// routes/auth-routes.js
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const ensureLogin = require("connect-ensure-login");
// Track model
const Tracks = require('../models/tracks');
const cookieSession = require('cookie-session'); 

router.get('/', function(req, res, next) {
  Tracks.find({},"name track_ranking",function(err,tracks){
    res.render('feedback/user_feedback', { title: 'Feedback', tracks: tracks});
  }).sort([['track_ranking', -1]]);
});

module.exports = router;