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
  if (req.session.currentUser == undefined || req.session.currentUser.role == 'Creator') {
    res.redirect('/login')
  }
  else {
    Tracks.find({},"name track_ranking",function(err,tracks){
      res.render('feedback/user_feedback', { title: 'Feedback', tracks: tracks});
    }).sort([['track_ranking', -1]]);
}});


feedback_router.post('/update',urlencodedParser,(req,res)=>{
  Tracks.findOne({name: req.body.select}, (err, file) => {
    var num = file.number_of_plays + 1;

    var oldAvg = file.track_ranking;
    var newRating = parseInt(req.body.rate); 
    var avgRating = (oldAvg*(num-1) + newRating)/num;
    var query = {'name': req.body.select};

    Tracks.updateOne(query,{track_ranking:avgRating,number_of_plays:num}).then(result => {
      console.log(result.ok);
      if(result.ok != 1) {
        res.redirect('/feedback');
      } else {
        res.redirect('/hunters');
        alert("Congrats, your rating has been added to the database!");
      }
  });
  });
  //res.redirect('/feedback');
});



module.exports = feedback_router;