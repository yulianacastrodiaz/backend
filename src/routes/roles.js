const { Router } = require('express');
const router = Router();
const passport = require('passport');
const { User } = require('../db');
require('../passport.js');

router.put('/:id', (req, res) => {
  const { id } = req.params;
  User.findByPk(id)
    .then(user => {
      if (user.rol === 'admin') {
        res.json('Este usuario ya es administrador')
      } else {
        user.update({
          rol: "admin"
        })
          .then(() => {
            res.status(200)
              .json('Usuario ha sido promovido a administrador')
          })
          .catch(err => {
            res.status(400)
              .send(`Error al cambiar a admin ${err}`)
          })
      }
    })
})

module.exports = router