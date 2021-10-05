const { Router } = require('express');
const authConfig = require('../config/auth')
const passport = require('passport');
require('../passport.js')
const { User } = require('../db')
const router = Router();

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    console.log(id)
    User.destroy({
        where: {
            id: id
        }
    })
        .then(usuario => {

            if (!usuario) {
                console.log(!usuario)
                return res.status(200).json({ message: 'El usuario ha sido eliminado.' });
            } else {
                return res.json({ message: 'El ID no corresponde a ningun usuario' });
            }
        })
        .catch(err => res.send(404).json(err.message));
});


module.exports = router
