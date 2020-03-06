// routes/auth-routes.js
const express = require("express");
const authRoutes = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
// User model
const User = require("../models/user");

// Bcrypt to encrypt passwords
const bcrypt     = require("bcrypt");
const bcryptSalt = 10;

authRoutes.get("/", (req, res, next) => {
  res.render("auth/signup");
});

authRoutes.post("/login", passport.authenticate("local", {
  successRedirect: "/creator",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

authRoutes.post("/signup", urlencodedParser, (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role; 
  const email_address = req.body.email_address;
  const personal_tutor = req.body.personal_tutor;
  const challenge_level = 0;
  const track_hunter_ranking = 0; 

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    var salt = bcrypt.genSaltSync(bcryptSalt);
    var hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass, 
      role, 
      email_address, 
      personal_tutor, 
      challenge_level, 
      track_hunter_ranking
    });

    newUser.save((err) => {
      if (err) {
        res.render("auth/signup", { message: "Something went wrong" });
      } else {
        if (newUser.role == "Hunter") {
          res.redirect("/hunter");
        } else {
          res.redirect("/creator");
        }
      }
    });
  });
});

authRoutes.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("private", { user: req.user });
});

authRoutes.get("/logout", urlencodedParser, (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = authRoutes;