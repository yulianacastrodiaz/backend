const { Router } = require('express');
const router = Router();
const passport = require('passport');
const { user } = require('../models/User');
require('../passport.js');


router.post('/', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) throw err;
        if (!user) res.status(404).send('No se encontró el usuario');
        else {
            (user.isAdmin === true)
            return res.send('woouw ahora eres Admin');
        }
    })(req, res, next);
});

module.exports = router