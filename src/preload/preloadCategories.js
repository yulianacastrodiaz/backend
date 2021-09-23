const { Category } = require('../db')

function preloadCategories(){
  const categories = [{
    name: "wines"
  },{
    name: "beers"
  },{
    name: "whisky"
  }]

  try {
    const newCategories = categories.map(async(c) => {
      return await Category.create({
        name: c.name
      })
    })
  
   return Promise.all(newCategories)
  } catch (error) {
    return console.log(error)
  }
}

module.exports = preloadCategories;