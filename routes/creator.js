var express = require('express');
var router = express.Router();

/* GET creator page. */
router.get('/creator', function(req, res, next) {
  res.render('creator', { title: 'Hello', username: req.body.username });
});

router.post("/creator", passport.authenticate("local", {
  successRedirect: "/creator",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));


module.exports = router;