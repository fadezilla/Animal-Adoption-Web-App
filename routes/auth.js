var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var db = require("../models");
var UserService = require("../services/UserService")
var userService = new UserService(db);

passport.use(new LocalStrategy(function verify(username, password, cb) {
  userService.getOneByName(username).then((data) => {
    if(data === null) {
      return cb(null, false, { message: 'Incorrect username or password.' });
    }
      return cb(null, data);
  });  
}));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.Id, username: user.Username, role: user.Role });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

var router = express.Router();
router.get('/login', function(req, res, next) {
  const user = req.user;
  const username = req.user?.username;
  res.render('login', { user, username }); 
});

router.post('/login/password', passport.authenticate('local', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/login',
  failureMessage: true
}), (req, res, next)=> {
  req.session.userId = req.user.id;
  res.redirect('/');
});

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signup', function(req, res, next) {
    userService.create(req.body.firstname, req.body.lastname, req.body.username, req.body.password)
    res.redirect('/login');
  });

module.exports = router;