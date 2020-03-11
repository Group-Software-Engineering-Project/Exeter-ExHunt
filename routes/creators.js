// routes/creators.js
var express = require('express');
var router = express.Router();

// Doesnt do anything/Not linked to anything


// GET home page
router.get('/creators', function(req, res, next) {
  res.render('creators');
});

module.exports = router;