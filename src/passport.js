const passport = require('passport');
const { User } = require('./db');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const authConfig = require('./config/auth')
const GoogleStrategy = require("passport-google-oauth20").Strategy;



const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  User.findByPk(id)
  .then((user) => {
    if (user) {
      done(null, user);
    } else {
      done(user.errors, null);
    }
  });
});

passport.use(new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    passReqToCallback: true,
  }, (req, accessToken, refreshToken, profile, done) => {
    if(profile){
      User.findOne({where: {idGoogle: profile.id}})
      .then((user) =>{
        if(user){
          console.log("user is:", user);
          done(null, user)
        } else {
          User.create({
            username: profile.displayName,
            mail: profile.emails[0].value,
            name: profile.name.givenName,
            lastname: profile.name.familyName,
            photo: profile.photos[0].value,
            idGoogle: profile.id
          })
          .then((newUser) => {
            console.log('user created:', newUser)
            done(null, newUser)
          })
          .catch(error => {
            throw new Error(error)
          })
        }
      })
      .catch(error => {
        throw new Error(error)
      })
    }
  }
));

passport.use(new LocalStrategy(
  function (username, password, done) {
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
      return done(err)
    })
  }
))




module.exports = passport