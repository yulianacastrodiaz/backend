// const { Router } = require('express');
// const authConfig = require('../config/auth')
// const passport = require('passport');
// // const jwt = require('jsonwebtoken');
// const redis = require('redis');
// const JWTR =  require('jwt-redis').default;
// const redisClient = redis.createClient();
// const jwtr = new JWTR(redisClient);
// require('../passport.js')
// const router = Router();

// router.delete('/', (req, res, next) => {
//   passport.authenticate('local', (err, user, info) => {
//     if (err) throw err;
//     if (!user) res.status(404).send('El usuario no existe');
//     else {
//       req.destroy(user, (err) => {
//         if (err) throw err;
//         let token = jwtr.destroy({ user: user }, authConfig.secret, {
//           expiresIn: authConfig.expires
//         })
//         res.json({ user, token, msg: 'El usuario se elimino exitosamente'});
//       });
//     }
//   })(req, res, next);
// });

// module.exports = router
