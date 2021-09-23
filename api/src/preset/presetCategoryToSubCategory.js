const { Category } = require('../db')
const { SubCategory } = require('../db')
const { Op } = require("sequelize");

//await foo.addBars([bar1, bar2]);
async function presetCategoryToSubCategory(){
  try {
    const categoryWine = await Category.findOne({where: { name: "wines" } });
    const allSubCatwines = await SubCategory.findAll({
      where: {
        [Op.or] :[
          {type: "red"},
          {type: "white"},
          {type: "pink"},
          {type: "sparking"},
        ]
      }
    });
    const aux = await categoryWine.addSubCategories(allSubCatwines)
    const categoryBeer = await Category.findOne({where: { name: "beers" } });
    const allSubCatBeers = await SubCategory.findAll({
      where: {
        [Op.or] :[
          {type: "yellow"},
          {type: "amber"},
          {type: "dark"},
        ]
      }
    });
    const aux2 = await categoryBeer.addSubCategories(allSubCatBeers)
    return console.log("preseteado de subcategorías a categorías: done :)")
  } catch (error) {
    return console.log(error)
  }
}

module.exports = presetCategoryToSubCategory;