// routes/auth-routes.js
const express = require("express");
const authRoutes = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
// User model
const User = require("../models/user");
const cookieSession = require('cookie-session'); 
const session = require('express-session');

// Bcrypt to encrypt passwords
const bcrypt     = require("bcryptjs");
const bcryptSalt = 10;

authRoutes.get("/", (req, res, next) => {
  res.render("auth/signup");
});

authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login");
});

authRoutes.post("/login", urlencodedParser, (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "") {
    res.render("auth/login", {
      errorMessage: "Indicate a username and a password to log in"
    });
    return;
  }

  User.findOne({ "username": username}, 
    (err, user) => {
      if (err || !user) {
        res.render("auth/login", {
          errorMessage: "The username doesn't exist"
        });
        return;
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          req.session.currentUser = user;
          const address = (user.role == "Hunter") ? "/hunters" : "/creator"
          res.redirect(address);
        } else {
          res.render("auth/login", {
            errorMessage: "Incorrect password"
          });
        }
      }
  });
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
        req.session.currentUser = newUser;
        if (newUser.role == "Hunter") {
          res.redirect("/hunters");
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