const { Router } = require('express');
const router = Router();
const { User } = require('../db');
const bcrypt = require('bcrypt');
require('../passport');

router.put('/resetPassword', async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const hash = await bcrypt.hash(newPassword, 10);
    const user = await User.findOne(
      { mail: email },
      { password: hash, resetPass: false }
    );
    res.send('Actualizado');
  } catch (e) {
    res.status(404).send('No tienes permisos');
  }
});

module.exports = router