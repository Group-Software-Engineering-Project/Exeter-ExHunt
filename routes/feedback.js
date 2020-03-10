// routes/auth-routes.js
const express = require("express");
const feedback_router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const ensureLogin = require("connect-ensure-login");
const mongoose = require('mongoose');
// Track model
const Tracks = require('../models/tracks');
const cookieSession = require('cookie-session'); 

feedback_router.get('/', function(req, res, next) {
  Tracks.find({},"name track_ranking",function(err,tracks){
    res.render('feedback/user_feedback', { title: 'Feedback', tracks: tracks});
  }).sort([['track_ranking', -1]]);
});


feedback_router.post('/update',urlencodedParser,(req,res)=>{
  
  var query = {'name': req.body.select};
  Tracks.updateOne(query,{track_ranking:req.body.rate}).then(result => {
      console.log(result);
  });
  res.redirect('/login');
});



module.exports = feedback_router;