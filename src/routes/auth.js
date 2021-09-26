const { Router } = require('express');
const authConfig = require('../config/auth');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('../auth/google');
require('../passport.js')

const router = Router();

router.get('/google',
passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get('/google/callback',(req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err;
    console.log(!user)
    if (!user) res.status(404).send('El usuario que ingreso no existe');
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        let token = jwt.sign({ user: user }, authConfig.secret, {
          expiresIn: authConfig.expires
        })
        res.json({ user, token, msg: 'Autenticación exitosa'});
      });
    }
  })(req, res, next);
});


module.exports = router;

