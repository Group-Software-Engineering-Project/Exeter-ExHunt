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
  Tracks.updateOne(query,{track_ranking:req.body.rate, number_of_plays:+1}).then(result => {
      if(result.ok != 1) {
        res.redirect('/login');
      } else {
        alert("Congrats, your rating has been added to the database!");
      }
  });
  res.redirect('/login');
});



module.exports = feedback_router;