const { Router } = require('express');
require('../passport.js')
const { User } = require('../db')
const router = Router();

router.delete('/:id', async (req, res) => {
    let { id } = req.params;
	try {
		let exists = await User.findByPk(id); 
		if (exists) {
			await User.destroy({ 
				where: {
					id: id
				}
			});
			return res.status(200).json({ message: 'El usuario ha sido eliminado.' }); 
		} else {
			return res.json({ message: 'El ID no corresponde a ningun usuario' });
		}
	} catch (err) {
		res.send(404).json(err.message)
	}
});

module.exports = router
