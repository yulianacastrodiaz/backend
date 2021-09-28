const { Router } = require('express');
require('../passport.js')
const router = Router();


router.get('/',
function (req, res) {
  req.logout();
  res.redirect('/login');
});

module.exports = router