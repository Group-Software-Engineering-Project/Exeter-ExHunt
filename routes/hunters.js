var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/hunters', function(req, res, next) {
  res.render('hunters');
});

module.exports = router;