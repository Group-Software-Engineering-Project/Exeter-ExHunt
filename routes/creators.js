var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/creators', function(req, res, next) {
  res.render('creators');
});

module.exports = router;