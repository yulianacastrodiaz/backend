const { Router } = require('express');
const router = Router();
const { user } = require('../models/User');
// const passport = require('passport');
require('../passport');

router.put('/resetPassword', async (req, res) => {
    try {
      const { userEmail, newPassword } = req.body;
      const hash = await bcrypt.hash(newPassword, 10);
      const users = await user.findOneAndUpdate(
        { email: userEmail },
        { password: hash, resetPass: false }
      );
      res.send('Actualizado');
    } catch (e) {
      res.status(404).send('No tienes permiso');
    }
  });

module.exports = router