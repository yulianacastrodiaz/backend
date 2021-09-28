const { Review } = require('../db')
const { Product } = require('../db')

async function presetReviews(){
  try {
    const wineCafayate = await Product.findOne({where: { name: "Torrontés Cafayate Gran Linaje" } })
    const reviews = await Review.findAll()
   
    await wineCafayate.addReviews([reviews[0], reviews[1], reviews[2], reviews[9], reviews[10], reviews[11]])
    
    const whiskyChivas = await Product.findOne({ where: { name: "Chivas Regal Mizunara" }})
    await whiskyChivas.addReviews([reviews[3], reviews[4], reviews[5]])

    const wineRutini = await Product.findOne({ where: { name: 'Rutini Malbec' }})
    await wineRutini.addReviews([reviews[6], reviews[7]])
  } catch (error) {
    return console.log(error)
  }

}

module.exports = presetReviews;