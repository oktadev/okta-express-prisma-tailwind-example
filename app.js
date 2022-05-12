var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var dashboardRouter = require('./routes/dashboard');

const session = require('express-session');
const passport = require('passport');
const { Strategy } = require('passport-openidconnect');

var app = express();

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

require('dotenv').config({path:'./.okta.env'});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({
  secret: 'CanYouLookTheOtherWay',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


const {OKTA_OAUTH2_CLIENT_ID, OKTA_OAUTH2_CLIENT_SECRET, OKTA_OAUTH2_ISSUER} = process.env;

// set up passport
passport.use('oidc', new Strategy({
  issuer: OKTA_OAUTH2_ISSUER,
  authorizationURL: `${OKTA_OAUTH2_ISSUER}/v1/authorize`,
  tokenURL: `${OKTA_OAUTH2_ISSUER}/v1/token`,
  userInfoURL: `${OKTA_OAUTH2_ISSUER}/v1/userinfo`,
  clientID: OKTA_OAUTH2_CLIENT_ID,
  clientSecret: OKTA_OAUTH2_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/authorization-code/callback',
  scope: 'openid profile'
}, (issuer, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, next) => {
  next(null, user);
});

passport.deserializeUser((obj, next) => {
  next(null, obj);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', passport.authenticate('oidc'));

app.use('/authorization-code/callback',
  passport.authenticate('oidc', { failureRedirect: '/error' }),
  (req, res, next) => {
    res.redirect('/dashboard');
  }
);

app.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);

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

module.exports = app;