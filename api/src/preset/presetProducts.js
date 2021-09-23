const { Op } = require("sequelize");
const { Category } = require('../db')
const { SubCategory } = require('../db')
const { Grape } = require('../db')
const { Product } = require('../db')

async function presetProduct(){
  try {
    //Load wines Red Malbec
    const winesm = await Product.findAll({
      where: {
        name: {
          [Op.or] :['El Enemigo','Puna Reserva','Santa Julia Reserva Malbec','Manos Negras Malbec','Nicasia malbec','Rutini Malbec']
        }
      }
    })
    const categoryWine = await Category.findOne({where: { name: "wines"} })
    const subCategoryWineR = await SubCategory.findOne({where: { type: "red"} })
    const grapesm = await Grape.findOne({where: { name: "Malbec"} })
    await categoryWine.addProducts(winesm)
    await subCategoryWineR.addProduct(winesm)
    await grapesm.addProduct(winesm)

    //Load wines Red Cabernet Franc
     const winescf= await Product.findAll({
      where: {
        name: {
          [Op.or] :['Fow Castizo','Salentein Numina Cabernet Franc']
        }
      }
    })
    const grapescf = await Grape.findOne({where: { name: "Cabernet Franc"} })
    await categoryWine.addProducts(winescf)
    await subCategoryWineR.addProduct(winescf)
    await grapescf.addProduct(winescf)

    //Load wines Red Cabernet Sauvignon
    const winescs= await Product.findAll({
      where: {
        name: {
          [Op.or] :['Andeluna 1300 Cabernet Sauvignon','Marchiori & Barraud Cabernet Sauvignon','Finca Suarez Cabernet Sauvignon']
        }
      }
    })
    const grapescs = await Grape.findOne({where: { name: "Cabernet Sauvignon"} })
    await categoryWine.addProducts(winescs)
    await subCategoryWineR.addProduct(winescs)
    await grapescs.addProduct(winescs)

    //Load wines Red Blend
    const winesb= await Product.findAll({
      where: {
        name: {
          [Op.or] :['Sapere','Andeluna Elevación','Tensión la Ribera Blend','La Danza Blend']
        }
      }
    })
    const grapesb = await Grape.findOne({where: { name: "Blend"} })
    await categoryWine.addProducts(winesb)
    await subCategoryWineR.addProduct(winesb)
    await grapesb.addProduct(winesb)

     //Load wines Red Bonarda
     const winesba= await Product.findAll({
      where: {
        name: {
          [Op.or] :['Colonia las Liebres Bonarda','Via Revolucionaria Bonarda Pura']
        }
      }
    })
    const grapesba = await Grape.findOne({where: { name: "Bonarda"} })
    await categoryWine.addProducts(winesba)
    await subCategoryWineR.addProduct(winesba)
    await grapesba.addProduct(winesba)

    //Load wines Red Pinot Noir
    const winespn= await Product.findAll({
      where: {
        name: {
          [Op.or] :['La Posta Glorieta Pinot Noir']
        }
      }
    })
    const grapespn = await Grape.findOne({where: { name: "Pinot Noir"} })
    await categoryWine.addProducts(winespn)
    await subCategoryWineR.addProduct(winespn)
    await grapespn.addProduct(winespn)

    //Load wines Red Syrah
    const winesh= await Product.findAll({
      where: {
        name: {
          [Op.or] :['Dv Catena Syrah']
        }
      }
    })
    const grapesh = await Grape.findOne({where: { name: "Syrah"} })
    await categoryWine.addProducts(winesh)
    await subCategoryWineR.addProduct(winesh)
    await grapesh.addProduct(winesh)

    //Load wines Pink Blend
    const winepb = await Product.findAll({
      where: {
        name: {
          [Op.or] :['Mendel Rosadia']
        }
      }
    })
    const subCategoryWineP = await SubCategory.findOne({where: { type: "pink"} })
    const grapepb = await Grape.findOne({where: { name: "Blend"} })
    await categoryWine.addProducts(winepb)
    await subCategoryWineP.addProduct(winepb)
    await grapepb.addProduct(winepb)

    //Load wines Pink Malbec
    const winepm = await Product.findAll({
      where: {
        name: {
          [Op.or] :['Tinto Negro Uco Valley Rose','La Posta Rosé de Malbec']
        }
      }
    })
    const grapepm = await Grape.findOne({where: { name: "Malbec"} })
    await categoryWine.addProducts(winepm)
    await subCategoryWineP.addProduct(winepm)
    await grapepm.addProduct(winepm)

    //Load wines Pink Pinot Noir
    const wineppn = await Product.findAll({
      where: {
        name: {
          [Op.or] :['Bressia Sylvestra Pinot Noir Rosé']
        }
      }
    })
    const grapeppn = await Grape.findOne({where: { name: "Pinot Noir"} })
    await categoryWine.addProducts(wineppn)
    await subCategoryWineP.addProduct(wineppn)
    await grapeppn.addProduct(wineppn)

    //Load wines White Sauvignon Blanc
    const winewsb = await Product.findAll({
      where: {
        name: {
          [Op.or] :['Casa Ambrosia Sauvignon Blanc','Tacuil RD Sauvignon Blanc']
        }
      }
    })
    const subCategoryWineW = await SubCategory.findOne({where: { type: "white"} })
    const grapewsb = await Grape.findOne({where: { name: "Sauvignon Blanc"} })
    await categoryWine.addProducts(winewsb)
    await subCategoryWineW.addProduct(winewsb)
    await grapewsb.addProduct(winewsb)

    //Load wines White Chardonnay
    const winewch = await Product.findAll({
      where: {
        name: {
          [Op.or] :['Manos Negras Chardonnay','Potrero Chardonnay','Trivento Golden Reserve Chardonnay']
        }
      }
    })
    const grapewch = await Grape.findOne({where: { name: "Chardonnay"} })
    await categoryWine.addProducts(winewch)
    await subCategoryWineW.addProduct(winewch)
    await grapewch.addProduct(winewch)

    //Load wines White Malbec
    const winewm = await Product.findAll({
      where: {
        name: {
          [Op.or] :['Trivento White Malbec']
        }
      }
    })
    const grapewm = await Grape.findOne({where: { name: "Malbec"} })
    await categoryWine.addProducts(winewm)
    await subCategoryWineW.addProduct(winewm)
    await grapewm.addProduct(winewm)

    //Load wines White Torrontes
    const winewt = await Product.findAll({
      where: {
        name: {
          [Op.or] :['Altaland Torrontés Salta','Torrontés Cafayate Gran Linaje']
        }
      }
    })
    const grapewt = await Grape.findOne({where: { name: "Torrontes"} })
    await categoryWine.addProducts(winewt)
    await subCategoryWineW.addProduct(winewt)
    await grapewt.addProduct(winewt)


    //Load Sparking wines Blend
    const winespb = await Product.findAll({
      where: {
        name: {
          [Op.or] :['Espumante Trivento Brut Nature','Baron B Brute Nature Cuvee','Luigi Bosca Brut']
        }
      }
    })
    const subCategoryWineS = await SubCategory.findOne({where: { type: "sparkling"} })
    const grapespb = await Grape.findOne({where: { name: "Blend"} })
    await categoryWine.addProducts(winespb)
    await subCategoryWineS.addProduct(winespb)
    await grapespb.addProduct(winespb)

    //Load beers Yellow
    const beery = await Product.findAll({
      where: {
        name: {
          [Op.or] :['Patagonia Bohemian Pilsener','Heineken', 'Stella Artois']
        }
      }
    })
    const categoryBeer = await Category.findOne({where: { name: "beers"} })
    const subCategoryBeerY = await SubCategory.findOne({where: { type: "yellow"} })
    await categoryBeer.addProducts(beery)
    await subCategoryBeerY.addProduct(beery)

    //Load beers Amber
     const beera = await Product.findAll({
      where: {
        name: {
          [Op.or] :['Patagonia Amber Lager','Beagle Red Ale']
        }
      }
    })
    const subCategoryBeerA = await SubCategory.findOne({where: { type: "amber"} })
    await categoryBeer.addProducts(beera)
    await subCategoryBeerA.addProduct(beera)

    //Load beers Dark
    const beerd = await Product.findAll({
      where: {
        name: {
          [Op.or] :['Quilmes Stout','Stella Artois Noire']
        }
      }
    })
    const subCategoryBeerD = await SubCategory.findOne({where: { type: "dark"} })
    await categoryBeer.addProducts(beerd)
    await subCategoryBeerD.addProduct(beerd)

    //Load whiskies 
    const whisky = await Product.findAll({
      where: {
        name: {
          [Op.or] :['Johnnie Walker 18 años','Johnnie Walker Double Black', 'Johnnie Walker Green Label','Chivas Regal Mizunara','The Glenlivet Founders Reserve','Aberlour Single Malt 12']
        }
      }
    })
    const categoryWk = await Category.findOne({where: { name: "whisky"} })
    await categoryWk.addProducts(whisky)
  
  } catch (error) {
    return console.log(error)
  }
}

module.exports = presetProduct;