var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET creator page. */
router.get('/', function(req, res, next) {
  res.render('creator', { title: 'Hello', username: req.body.username });
});

router.post("/creator", passport.authenticate("local", {
  successRedirect: "/creator",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));


module.exports = router;