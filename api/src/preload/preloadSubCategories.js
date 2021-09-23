const { SubCategory } = require('../db')

function preloadSubCategories(){
  const subCategories = [{
    type: "red"
  },{
    type: "pink"
  },{
    type: "white"
  },{
    type: "sparkling"
  },{
    type: "yellow"
  },{
    type: "amber"
  },{
    type: "dark"
  }]

  try {
    const newSubCategories = subCategories.map(async(s) => {
      return await SubCategory.create({
        type: s.type
      })
    })

    return Promise.all(newSubCategories)
  } catch (error) {
    return console.log(error)
  }
}

module.exports = preloadSubCategories;