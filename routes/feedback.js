// routes/auth-routes.js
const express = require("express");
const feedback_router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const ensureLogin = require("connect-ensure-login");
// Track model
const Tracks = require('../models/tracks');
const cookieSession = require('cookie-session'); 

feedback_router.get('/', function(req, res, next) {
  Tracks.find({},"name track_ranking",function(err,tracks){
    res.render('feedback/user_feedback', { title: 'Feedback', tracks: tracks});
  }).sort([['track_ranking', -1]]);
});

//trackCreator.post('/upload',upload.any(),function(req,res){
//authRoutes.post("/login", urlencodedParser, (req, res, next) => {

feedback_router.post('/update'),urlencodedParser, function(req,res){
  console.log(req.body);
  //Tracks.updateOne({name:track_name}, )
}
module.exports = feedback_router;