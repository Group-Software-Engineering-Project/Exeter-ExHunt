// routes/auth-routes.js
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const ensureLogin = require("connect-ensure-login");
// User model
const User = require("../models/user");
const cookieSession = require('cookie-session'); 

router.get('/', function(req, res, next) {
  res.render('feedback/user_feedback');
});

module.exports = router;