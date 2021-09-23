const { Grape } = require('../db')

function preloadGrapes(){
  const graps = [{
    name: "Cabernet Sauvignon"
  },{
    name: "Pinot Noir"
  },{
    name: "Chardonnay"
  },{
    name: "Merlot"
  },{
    name: "Syrah"
  },{
    name: "Malbec"
  },{
    name: "Torrontes"
  },{
    name: "Cabernet Franc"
  },{
    name: "Blend"
  },{
    name: "Bonarda"
  },{
    name: "Sauvignon Blanc"
  }]

  try {
    const newGrapes = graps.map(async(g) => {
      return await Grape.create({
        name: g.name
      })
    })
  
   return Promise.all(newGrapes)
  } catch (error) {
    return console.log(error)
  }
}

module.exports = preloadGrapes;