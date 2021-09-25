const passport = require('passport');
const { User } = require('./db');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;


// passport.use(new LocalStrategy(
//     function(username, password, done) {
//       User.findOne({ 
//           where: {username: username} }, function (err, user) {
//         if (err) { return done(err); }
//         if (!user) {
//             console.log(!user)
//           return done(null, false, { message: 'Incorrect username.' });
//         }
//         if (!user.validPassword(password)) {
//           return done(null, false, { message: 'Incorrect password.' });
//         }
//         return done(null, user);
//       });
//     }
//   ));
  

passport.use(new LocalStrategy(
    function (username, password, done) {
        console.log(username, password)
        User.findOne({
            where: {
                username: username
            }
        }).then(function (user) {
            if (user === null) {
                console.log(user === null)
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

// module.exports = function (passport) {
//     passport.use(
//       new LocalStrategy((username, password, done) => {
//         User.findOne({ 
//             where: {
//                 username: username }
//         }, (err, user) => {
//           if (err) throw err;
//           if (!user) return done(null, false);
//           bcrypt.compare(password, user.password, (err, result) => {
//             if (err) throw err;
//             if (result === true) {
//               return done(null, user);
//             } else {
//               return done(null, false);
//             }
//           });
//         });
//       })
//     );
  
//     passport.serializeUser((user, cb) => {
//       cb(null, user.id);
//     });
//     passport.deserializeUser((id, cb) => {
//       User.findOne({ _id: id }, (err, user) => {
//         const userInformation = {
//           username: user.username,
//         };
//         cb(err, userInformation);
//       });
//     });
//   };

