const { Router } = require('express');
const { send } = require('process');
const { grape } = require('../db')
const { SubCategory, Product } = require('../db')
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
      res.send({ msg: "La subcategoría ha sido actualizada con éxito"})
    }
  })
} catch (error) {
  console.log(error)
  res.status(404).json(error)
}

try {
  router.post('/', async(req, res) => {
    const { type, category } = req.body
    const newSubCategory = await SubCategory.create({type})
    const catid = await Category.findOne({where: { name: category }})
    newSubCategory.setCategory(catid.id)
      res.json(catid)
  })
} catch (error) {
  console.log(error)
  res.status(404).json(error)
}

try {
  router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (id) {
    const prod = await Product.findOne({
      where: { subCategoryId : id }
    })
    console.log('Prod: ', prod)
    if (prod) {
      return res.send(`Sub Category has associated products, can't be deleted`)
    }
    const elem = await SubCategory.destroy({
        where: { id }
     });
     res.send('SubCategory has been deleted')
  }
  }) 
} catch (error) {
     res.status(404).send(`Error in route.delete /product/:id ${error}`);
}

module.exports = router;