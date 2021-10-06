const { Router } = require('express');
const router = Router();
const passport = require('passport');
const { User } = require('../db');
require('../passport.js');

router.put('/:id', (req, res) => {
  const { id } = req.params;
  User.findByPk(id)
    .then(user => {
      if (user.isAdmin === true) {
        res.json('Este usuario ya es administrador')
      } else {
        user.update({
          isAdmin: true
        })
          .then(() => {
            res.status(200)
              .json('Usuario ha sido promovido a administrador')
          })
          .catch(err => {
            res.status(404)
              .send(`Error al cambiar a admin ${err}`)
          })
      }
    })
})

module.exports = router