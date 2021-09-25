const { Router } = require('express');
const { User } = require('../db.js')
const passport = require('passport');
// const Passport = require('../passport.js')
require('../passport.js')
const router = Router();


router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err;
    if (!user) res.status(404).send('El usuario no existe');
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send('Autenticación exitosa');
        console.log(req.user);
      });
    }
  })(req, res, next);
});

router.get('/logout',
function (req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/profile', (req, res) => {
  res.send(req.user); 
});


  
module.exports = router