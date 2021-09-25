const { Router } = require('express');
const { User } = require('../db.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth')

const router = Router();

router.post('/', async (req, res) => {
  const { username, mail, password, name, lastname } = req.body;
  let passwordHashed = bcrypt.hashSync(password, authConfig.rounds)

  if (!username) {
    return res.status(400).json({ msg: "Ingresa un nombre de usuario" });
  }

  if (!name) {
    return res.status(400).json({ msg: "Ingresa un nombre" });
  }

  if(password.length < 6){
    return res.status(400).json({ msg: "La contraseña debe ser mínimo de 6 caracteres"})
  }

  if (!lastname) {
    return res.status(400).json({ msg: "Ingresa el apellido" });
  }

  if (!mail) {
    return res.status(400).json({ msg: "Ingresa un mail" });
  }

  if (!password) {
    return res.status(400).json({ msg: "Ingresa una contraseña" });
  }

  try {
    const newUser = await User.create({
      mail,
      username,
      name,
      lastname,
      password: passwordHashed,
    })
    let token = jwt.sign({ user: newUser }, authConfig.secret, {
      expiresIn: authConfig.expires
    })
    res.json({
      user: newUser,
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

module.exports = router;