const { Category } = require('../db')
const { SubCategory } = require('../db')

//await foo.addBars([bar1, bar2]);
async function presetCategoryToSubCategory(){
  try {
    const categoryWine = await Category.findOne({where: { name: "wines" } });
    const allSubCategories = await SubCategory.findAll();
    const aux = await categoryWine.addSubCategories(allSubCategories)
    return console.log("preseteado de subcategorías a categorías: done :)")
  } catch (error) {
    return console.log(error)
  }
}

module.exports = presetCategoryToSubCategory;