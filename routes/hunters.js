var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {

  res.render('hunters', {challenges:4});
});



module.exports = router;