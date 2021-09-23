const { Review } = require('../db')
const { Product } = require('../db')

async function presetReviews(){
  try {
    const wineCafayate = await Product.findOne({where : { name: "Cafayate" } })
    const reviews = await Review.findAll()
  
    await wineCafayate.addReviews([reviews[0], reviews[1], reviews[2]]) 
  } catch (error) {
    return console.log(error)
  }

}

module.exports = presetReviews;