// routes/auth-routes.js
const express = require("express");
const authRoutes = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
const nodemailer = require("nodemailer");
// User model
const User = require("../models/user");
const cookieSession = require('cookie-session'); 
const session = require('express-session');
var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');
var path = require('path');
var callback = () => console.log("Hello yo!");

// Bcrypt to encrypt passwords
const bcrypt     = require("bcryptjs");
const bcryptSalt = 10;

//route to "signup" page
authRoutes.get("/", (req, res, next) => {
  res.render("auth/signup");
});

//route to "login" page
authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login");
});

//route login 
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

//route signup
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
      track_hunter_ranking,
      track_name: ""
    });

    newUser.save((err) => {
      if (err) {
        res.render("auth/signup", { message: "Something went wrong" });
      } else {
        req.session.currentUser = newUser;
        User.find({personal_tutor:newUser.personal_tutor},'username email_address', (err,users) => {
          console.log(users);

          var email_list = [];

          for(i=0; i<users.length; i++){
            email_list.push(users[i].email_address);
          }

          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
              user: 'exeterexhunt@gmail.com',
              pass: 'exhunt420'
          }
          });

          for(i=0; i<email_list.length; i++){
            var mailOptions = {
              from: 'exeterexhunt@gmail.com',
              to: email_list[i],
              subject: 'Peer Sign-up',
              html: `<html xmlns="http://www.w3.org/1999/xhtml">
              <head>
              <!-- If you delete this meta tag, Half Life 3 will never be released. -->
              <meta name="viewport" content="width=device-width" />
              
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
              <title>ZURBemails</title>
                
              
              
              <style>
                /* ------------------------------------- 
                  GLOBAL 
              ------------------------------------- */
              * { 
                margin:0;
                padding:0;
              }
              * { font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif; }
              
              img { 
                max-width: 100%; 
              }
              .collapse {
                margin:0;
                padding:0;
              }
              body {
                -webkit-font-smoothing:antialiased; 
                -webkit-text-size-adjust:none; 
                width: 100%!important; 
                height: 100%;
              }
              
              
              /* ------------------------------------- 
                  ELEMENTS 
              ------------------------------------- */
              a { color: #2BA6CB;}
              
              .btn {
                text-decoration:none;
                color: #FFF;
                background-color: #666;
                padding:10px 16px;
                font-weight:bold;
                margin-right:10px;
                text-align:center;
                cursor:pointer;
                display: inline-block;
              }
              
              p.callout {
                padding:15px;
                background-color:#ECF8FF;
                margin-bottom: 15px;
              }
              .callout a {
                font-weight:bold;
                color: #2BA6CB;
              }
              
              table.social {
              /* 	padding:15px; */
                background-color: #ebebeb;
                
              }
              .social .soc-btn {
                padding: 3px 7px;
                font-size:12px;
                margin-bottom:10px;
                text-decoration:none;
                color: #FFF;font-weight:bold;
                display:block;
                text-align:center;
              }
              a.fb { background-color: #3B5998!important; }
              a.tw { background-color: #1daced!important; }
              a.gp { background-color: #DB4A39!important; }
              a.ms { background-color: #000!important; }
              
              .sidebar .soc-btn { 
                display:block;
                width:100%;
              }
              
              /* ------------------------------------- 
                  HEADER 
              ------------------------------------- */
              table.head-wrap { width: 100%;}
              
              .header.container table td.logo { padding: 15px; }
              .header.container table td.label { padding: 15px; padding-left:0px;}
              
              
              /* ------------------------------------- 
                  BODY 
              ------------------------------------- */
              table.body-wrap { width: 100%;}
              
              
              /* ------------------------------------- 
                  FOOTER 
              ------------------------------------- */
              table.footer-wrap { width: 100%;	clear:both!important;
              }
              .footer-wrap .container td.content  p { border-top: 1px solid rgb(215,215,215); padding-top:15px;}
              .footer-wrap .container td.content p {
                font-size:10px;
                font-weight: bold;
                
              }
              
              
              /* ------------------------------------- 
                  TYPOGRAPHY 
              ------------------------------------- */
              h1,h2,h3,h4,h5,h6 {
              font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; line-height: 1.1; margin-bottom:15px; color:#000;
              }
              h1 small, h2 small, h3 small, h4 small, h5 small, h6 small { font-size: 60%; color: #6f6f6f; line-height: 0; text-transform: none; }
              
              h1 { font-weight:200; font-size: 44px;}
              h2 { font-weight:200; font-size: 37px;}
              h3 { font-weight:500; font-size: 27px;}
              h4 { font-weight:500; font-size: 23px;}
              h5 { font-weight:900; font-size: 17px;}
              h6 { font-weight:900; font-size: 14px; text-transform: uppercase; color:#444;}
              
              .collapse { margin:0!important;}
              
              p, ul { 
                margin-bottom: 10px; 
                font-weight: normal; 
                font-size:14px; 
                line-height:1.6;
              }
              p.lead { font-size:17px; }
              p.last { margin-bottom:0px;}
              
              ul li {
                margin-left:5px;
                list-style-position: inside;
              }
              
              /* ------------------------------------- 
                  SIDEBAR 
              ------------------------------------- */
              ul.sidebar {
                background:#ebebeb;
                display:block;
                list-style-type: none;
              }
              ul.sidebar li { display: block; margin:0;}
              ul.sidebar li a {
                text-decoration:none;
                color: #666;
                padding:10px 16px;
              /* 	font-weight:bold; */
                margin-right:10px;
              /* 	text-align:center; */
                cursor:pointer;
                border-bottom: 1px solid #777777;
                border-top: 1px solid #FFFFFF;
                display:block;
                margin:0;
              }
              ul.sidebar li a.last { border-bottom-width:0px;}
              ul.sidebar li a h1,ul.sidebar li a h2,ul.sidebar li a h3,ul.sidebar li a h4,ul.sidebar li a h5,ul.sidebar li a h6,ul.sidebar li a p { margin-bottom:0!important;}
              
              
              
              /* --------------------------------------------------- 
                  RESPONSIVENESS
                  Nuke it from orbit. It's the only way to be sure. 
              ------------------------------------------------------ */
              
              /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
              .container {
                display:block!important;
                max-width:600px!important;
                margin:0 auto!important; /* makes it centered */
                clear:both!important;
              }
              
              /* This should also be a block element, so that it will fill 100% of the .container */
              .content {
                padding:15px;
                max-width:600px;
                margin:0 auto;
                display:block; 
              }
              
              /* Let's make sure tables in the content area are 100% wide */
              .content table { width: 100%; }
              
              
              /* Odds and ends */
              .column {
                width: 300px;
                float:left;
              }
              .column tr td { padding: 15px; }
              .column-wrap { 
                padding:0!important; 
                margin:0 auto; 
                max-width:600px!important;
              }
              .column table { width:100%;}
              .social .column {
                width: 280px;
                min-width: 279px;
                float:left;
              }
              
              /* Be sure to place a .clear element after each set of columns, just to be safe */
              .clear { display: block; clear: both; }
              
              
              /* ------------------------------------------- 
                  PHONE
                  For clients that support media queries.
                  Nothing fancy. 
              -------------------------------------------- */
              @media only screen and (max-width: 600px) {
                
                a[class="btn"] { display:block!important; margin-bottom:10px!important; background-image:none!important; margin-right:0!important;}
              
                div[class="column"] { width: auto!important; float:none!important;}
                
                table.social div[class="column"] {
                  width:auto!important;
                }
              
              }
              </style>
              
              
              
              
              
              </head>
               
              <body bgcolor="#FFFFFF">
              
              <!-- HEADER -->
              <table class="head-wrap" bgcolor="#999999">
                <tr>
                  <td></td>
                  <td class="header container" >
                      
                      <div class="content">
                      <table bgcolor="#999999">
                        <tr>
                          <td></td>
                          <td align="right"><h6 class="collapse"></h6></td>
                        </tr>
                      </table>
                      </div>
                      
                  </td>
                  <td></td>
                </tr>
              </table><!-- /HEADER -->
              
              
              <!-- BODY -->
              <table class="body-wrap">
                <tr>
                  <td></td>
                  <td class="container" bgcolor="#FFFFFF">
              
                    <div class="content">
                    <table>
                      <tr>
                        <td>
                          <h3>Hello ${users[i].username}!</h3>
                          <p class="lead">One of your peers: ${newUser.username}, in your tutor group has just signed up!</p>
                          <p>This email is just to let you know that one of the colleagues has recently signed up. Collaboration is encouraged in ExHunt, so feel free to get into contact with them via their email address: ${newUser.email_address}. <br><br> We hope you are enjoying using our app and continue to contribute. <br><br> Regards, <br><br> The exHunt Team :)</p>
                          <!-- Callout Panel -->
                          <p class="callout">
                            Feel free to check us out on our Socials below or access our site at this link:<a href="https://www.exeterexhunt.herokuapp.com">Click it! &raquo;</a>
                          </p><!-- /Callout Panel -->					
                                      
                          <!-- social & contact -->
                          <table class="social" width="100%">
                            <tr>
                              <td>
                                
                                <!-- column 1 -->
                                <table align="left" class="column">
                                  <tr>
                                    <td>				
                                      
                                      <h5 class="">Connect with Us:</h5>
                                      <p class=""><a href="https://www.facebook.com/Exhunt-107587557528113" class="soc-btn fb">Facebook</a> <a href="https://twitter.com/_Exhunt" class="soc-btn tw">Twitter</a> <a href="https://www.pinterest.co.uk/exeterexhunt/" class="soc-btn gp">Pinterest</a></p>
                          
                                      
                                    </td>
                                  </tr>
                                </table><!-- /column 1 -->	
                                
                                <!-- column 2 -->
                                <table align="left" class="column">
                                  <tr>
                                    <td>				
                                                    
                                      <h5 class="">Contact Info:</h5>												
                                      <p>Phone: <strong>01392 723551</strong><br/>
                              Email: <strong><a href="exeterexhunt@gmail.com">exeterexhunt@gmail.com</a></strong></p>
                              
                                    </td>
                                  </tr>
                                </table><!-- /column 2 -->
                                
                                <span class="clear"></span>	
                                
                              </td>
                            </tr>
                          </table><!-- /social & contact -->
                          
                        </td>
                      </tr>
                    </table>
                    </div><!-- /content -->
                                
                  </td>
                  <td></td>
                </tr>
              </table><!-- /BODY -->
              
              <!-- FOOTER -->
              <table class="footer-wrap">
                <tr>
                  <td></td>
                  <td class="container">
                    
                      <!-- content -->
                      <div class="content">
                      <table>
                      <tr>
                        <td align="center">
                          <p>
                            <a href="https://www.exeterexhunt.herokuapp.com"">Terms</a> |
                            <a href="https://www.exeterexhunt.herokuapp.com"">Privacy</a> |
                            <a href="https://www.exeterexhunt.herokuapp.com""><unsubscribe>Unsubscribe</unsubscribe></a>
                          </p>
                        </td>
                      </tr>
                    </table>
                      </div><!-- /content -->
                      
                  </td>
                  <td></td>
                </tr>
              </table><!-- /FOOTER -->
              
              </body>
              </html>`
            };

            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else{
                console.log('Email sent: ' + info.response);
              }
        });
      }


        });
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