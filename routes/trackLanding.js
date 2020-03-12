var express = require('express');
var router = express.Router();
var passport = require('passport');


router.get('/', function(req, res, next) {
  // check if logged in/is a creator
  if (req.session.currentUser == undefined || req.session.currentUser.role == 'Hunter') {
    res.redirect('/login')
  }
  else {
    res.render('creator/start', { title: 'Express', username: req.session.currentUser.username});
}});


module.exports = router;
