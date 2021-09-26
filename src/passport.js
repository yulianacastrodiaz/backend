const passport = require('passport');
const { User } = require('./db');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const authConfig = require('./config/auth')


passport.use(new LocalStrategy(
  function (username, password, done) {
    console.log(username, password)
    User.findOne({
      where: {
        mail: username
      }
    })
    .then(function (user) {
      if (user === null) {
        return done(null, false)
      }

      if (bcrypt.compareSync(password, user.password)) {
        return done(null, user)
      }

      return done(null, false)
    })
    .catch(err => {
      console.log(err)
      return err
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