const { Router } = require('express');
const { grape } = require('../db')
const { SubCategory } = require('../db')
const { Category } = require('../db')

const router = Router();

try {
  router.get('/', async (req, res) => {
    let { type } = req.query
    if (type) {
      const subCategoryDB = await SubCategory.findOne({ where: { type } })
      if (subCategoryDB) {
        res.json(subCategoryDB)
      } else {
        res.status(404).json(`La subcategoria ${type} es inexistente en este e-commerce\nComuniquese con la gente del backend`)
      }
    } else {
      const allsubcategorias = await SubCategory.findAll()
      res.json(allsubcategorias)
    }
  })
} catch (error) {
  console.log(error)
  res.status(404).json(error)
}

try {
  router.put('/', async (req, res) => {
    let { newtype, idsub} = req.body;
    if(newtype) {
      const subcategory = await SubCategory.findByPk(idsub)
      subcategory.type = newtype
      subcategory.save()
      res.json({ msg: "Su subcategoría ha sido actualizada con éxito"})
    }
  })
} catch (error) {
  console.log(error)
  res.status(404).json(error)
}

try {
  router.post('/', async(req, res) => {
    const { type, categoryId } = req.body
 
    const newSubCategory = await SubCategory.create({type})
    newSubCategory.setCategory(categoryId)
    res.json(newSubCategory)
  })
} catch (error) {
  console.log(error)
  res.status(404).json(error)
}

module.exports = router;