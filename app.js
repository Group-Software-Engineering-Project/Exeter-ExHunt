const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const authRoutes = require("./routes/auth-routes");
const hunterRoutes = require("./routes/hunters");
const creatorRoutes = require("./routes/trackLanding");
const challengeLoopRoutes = require('./routes/trackCreatorloop');
const viewCreatedRoutes = require('./routes/trackViewer');
const trackViewerRoutes = require('./routes/trackViewer');
const hunterTrackLooper = require('./routes/hunterLoop');
const leaderboardRoutes = require('./routes/leaderboards');
const resourcePageRoutes = require('./routes/resourcePage');
const feedback = require('./routes/feedback');
const createError = require('http-errors');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session");
const flash = require("connect-flash");
const bodyParser = require('body-parser');
const User = require("./models/user");
const app = express();

// Mongoose configurationrrs
mongoose.connect("mongodb://LucasMartinCalderon:LucasMartinCalderon123@ds046677.mlab.com:46677/exhunt");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main-layout');

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(flash());

app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true
}));
// store the user._id in the session
passport.serializeUser((user, done) => {
  done(null, user._id);
});
// fetch the user._id from database
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
// parse some custom thing into a Buffer
app.use(session({ resave: true, secret: '123456', saveUninitialized: true }));

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use('/', authRoutes);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);

app.use('/users', usersRouter);
app.use('/', authRoutes);
app.use('/hunters', hunterRoutes); 
app.use('/creator', creatorRoutes);
app.use('/challenge_loop',challengeLoopRoutes);
app.use('/view_track',viewCreatedRoutes);
app.use('/view_track',trackViewerRoutes);
app.use('/track_loop',hunterTrackLooper)
app.use('/leaderboardsPage', leaderboardRoutes);
app.use('/feedback', feedback);
app.use('/resourcePage', resourcePageRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(passport.initialize());
app.use(passport.session());

module.exports = app;
