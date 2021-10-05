const { Router } = require('express');
const authConfig = require('../config/auth');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('../passport.js')

const router = Router();

router.get('/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  const { user } = req;
  if(user){
    req.logIn(user, (err) => {
      if (err) throw err;
      let token = jwt.sign({ user: user }, authConfig.secret, {
        expiresIn: authConfig.expires
      })
      res.json({user, token, msg: "Autenticación exitosa con google"})
    })
  } else {
    res.status(404).send('El usuario no existe');
  }
})

module.exports = router;

