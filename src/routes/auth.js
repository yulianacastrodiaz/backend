const { Router} = require('express');
const session = require('express-session');
const passport = require('passport');
const  User  = require('../db')
require('../auth/google');

const router = Router();

// router.get('/', (req, res) => {
//   res.send('<a href="/auth/google">Authenticate with Google</a>');
// });

router.get('/google',
passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get('/google/callback',
  passport.authenticate('google'),
);

router.get('/logout', (req, res) => {
  // req.logout();
  // req.session.destroy();
  res.send('/auth');
});


module.exports = router;

