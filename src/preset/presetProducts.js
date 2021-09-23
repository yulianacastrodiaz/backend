const { Op } = require("sequelize");
const { Category } = require('../db')
const { SubCategory } = require('../db')
const { Grape } = require('../db')
const { Product } = require('../db')

async function presetProduct(){
  try {
    const wines = await Product.findAll({
      where: {
        [Op.or] :[
          {name: "Saint Felicien"},
          {name: "Cafayate"}
        ]
      }
    })
    const categoryWine = await Category.findOne({where: { name: "wines"} })
    const subCategoryWine = await SubCategory.findAll({where: {
      [Op.or] :[
        {type: "red"},
        {type: "white"}
      ]
    }})
    const grapes = await Grape.findAll({where: {
      [Op.or] :[
        {name: "Malbec"},
        {name: "Torrontes"}
      ]
    }})
   
    await categoryWine.addProducts(wines)
    await subCategoryWine[0].addProduct(wines[1])
    await subCategoryWine[1].addProduct(wines[0])
    await grapes[0].addProduct(wines[1])
    await grapes[1].addProduct(wines[0])
  } catch (error) {
    return console.log(error)
  }
}

module.exports = presetProduct;