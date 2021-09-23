const passport = require('passport');
const { User } = require('./db');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy(
    function (username, password, done) {
        console.log(username, password)
        User.findOne({
            where: {
                'username': username
            }
        }).then(function (user) {
            if (user == null) {
                // console.log(user == null)
                return done(null, false)
            }

            var hashedPassword = bcrypt.hashSync(password, user.salt)

            if (user.password === hashedPassword) {
                // console.log(user.password === hashedPassword)
                return done(null, user)
            }

            return done(null, false)
        })
    }
))

passport.serializeUser((user, done) => {
    done(null, user)
});

passport.deserializeUser(function (id, done) {
    User.findById(id).then(function (user) {
        if (user) {
            done(null, user.get());
        } else {
            done(user.errors, null);
        }
    });
});

module.exports = passport