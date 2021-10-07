const { Router } = require('express');
const { User } = require('../db');
const router = Router();

router.put('/user/:id', function (req, res) {
    const { id } = req.params;
    const { mail, username, name, lastname } = req.body;
    User.findByPk(id)
      .then((user => {
        user.update(
          {
            
            mail: mail,
            username: username,
            name: name,
            lastname : lastname
          })
      })
      )
      .then(() => {
        res.status(200).json('Datos cambiados con éxito')
      })
      .catch(error => {
        res.status(404).send(`Error ${error}`);
      })
  });


module.exports = router