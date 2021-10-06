const { Router } = require('express');
const authConfig = require('../config/auth');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('../passport.js')

const router = Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  const { user } = req;
  if(user){
    req.logIn(user, (err) => {
      if (err) throw err;
      // let token = jwt.sign({ user: user }, authConfig.secret, {
      //   expiresIn: authConfig.expires
      // })
      // res.cookie('token', token)
      // res.json({user, token, msg: "Autenticación exitosa con google"})
      res.redirect('http://localhost:3000/home')
      // res.send('hola')

      // res.redirect(url.format({
      //   pathname:"https://infallible-boyd-567028.netlify.app/home",
      //   query:'hola',
      // }))
    })
  } else {
    res.status(404).send('El usuario no existe');
  }
})

module.exports = router;

