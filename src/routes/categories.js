const { Router } = require('express');
const { Category } = require('../db')
const { SubCategory } = require('../db')
const router = Router();

router.get('/', async(req, res) => {
  const { name } = req.query
  try {
    if (name) {
      const categorie = await Category.findOne({ where: { name } })
      if (categorie) {
        res.json(categorie)
      } else {
        res.status(404).json({msg: `No se encontró la categoria ${name}`})
      }
    } else {
      const allCategories = await Category.findAll();
      res.json(allCategories)
    }
  } catch (error) {
    res.status(404).json(error)
  }
});

module.exports = router;