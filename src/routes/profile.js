const { Router } = require('express');
const passport = require('passport')
require('../passport.js')
const router = Router();


router.get('/', passport.authenticate('local'), (req, res) => {
  res.send(req.user);
});

module.exports = router