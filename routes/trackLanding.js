var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.currentUser == undefined || req.session.currentUser.role == 'Hunter') {
    res.redirect('/login')
  }
  else {
    res.render('creator/start', { title: 'Express', username: req.session.currentUser.username});
    console.log(req.session);
  }

});


module.exports = router;
