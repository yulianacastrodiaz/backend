const { Router } = require('express');
const authConfig = require('../config/auth');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {isUserAuthenticated} = require('../middlewares/auth')
require('../passport.js')

const router = Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', {
  failureMessage: "Cannot login to Google, please try again later!",
  failureRedirect: 'https://infallible-boyd-567028.netlify.app/',
  successRedirect: 'https://infallible-boyd-567028.netlify.app/home',
}), (req, res) => {
  console.log("User: ", req.user)
  res.send('Thank you for signing in')
  // const { user } = req;
  // if(user){
  //   req.logIn(user, (err) => {
  //     if (err) throw err;
  //     // let token = jwt.sign({ user: user }, authConfig.secret, {
  //     //   expiresIn: authConfig.expires
  //     // })
  //     // res.cookie('token', token)
  //     // res.json({user, token, msg: "Autenticación exitosa con google"})
  //     res.redirect('http://localhost:3000/home')
  //     // res.send('hola')

  //     // res.redirect(url.format({
  //     //   pathname:"https://infallible-boyd-567028.netlify.app/home",
  //     //   query:'hola',
  //     // }))
  //   })
  // } else {
  //   res.status(404).send('El usuario no existe');
  // }
})

router.get("/profile", isUserAuthenticated, (req, res) => {
  res.json(req.user)
})

module.exports = router;

