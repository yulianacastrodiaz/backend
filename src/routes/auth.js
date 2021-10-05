const { Router } = require('express');
// const authConfig = require('../config/auth');
const passport = require('passport');
// const jwt = require('jsonwebtoken');
// const {User} = require("../db.js");
require('../auth/google');
require('../passport.js')

const router = Router();

router.get('/google',
passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.profile'] }));

router.get('/google/callback', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    req.logIn(user, (err) => {
      if (err) throw err;
      var profile = googleUser.getBasicProfile();
      console.log("ID: " + profile.getId());
      console.log('Full Name: ' + profile.getName());
      console.log('Given Name: ' + profile.getGivenName());
      console.log('Family Name: ' + profile.getFamilyName());
      console.log("Image URL: " + profile.getImageUrl());
      console.log("Email: " + profile.getEmail());

      var id_token = googleUser.getAuthResponse().id_token;
      console.log("ID Token: " + id_token);
    });
  })(req, res, next)
});


module.exports = router;
