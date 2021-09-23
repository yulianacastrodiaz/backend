const { Router } = require('express');
require('dotenv').config();
const express = require('express');
const { Product, Category, SubCategory, Grape } = require('../db')
const filtrar = require('./filters.js')
const { api_key, api_secret, api_name } = process.env

const router = Router();
var cloudinary = require('cloudinary').v2


// router.use(express.json());
const firstUpperCase = function (mayus) { return mayus.replace(/\b\w/g, l => l.toUpperCase()) }

//Add a product to the database
router.post('/', async (req, res) => {
   let { name, description, brand, price, year, rating, stock, picture, category, subcategory, grape } = req.body;
   let errmsg = {};

   if (!name) {
      errmsg.name = 'Name is required'
   } else {
      if (!description) {
         errmsg.desc = 'Description is required'
      } else {
         if (isNaN(year)) {
            errmsg.year = 'Year is not a number'
         } else {
            if (!brand) {
               errmsg.brand = 'Brand is required'
            } else {
               if (isNaN(stock) || stock < 0) {
                  errmsg.brand = `Error in stock value: ${stock}`
               }
            }
         }
      }
   }

   try {
      //Find Category
      var categoryProd = await Category.findOne({
         where: { name: category }
      })
      if (categoryProd === null) {
         errmsg.cat = 'Invalid Category'
      }
      var subCatProd = await SubCategory.findOne({
         where: { type: subcategory }
      })
      if (subCatProd === null) {
         errmsg.subcat = 'Invalid SubCategory'
      }
      if (category === 'wines') {
         // Find Grape
         var grapes = await Grape.findOne({
            where: { name: grape }
         })
         if (grapes === null) {
            errmsg.grape = 'Invalid Grape'
         }
      }
      if (Object.keys(errmsg).length) {
         return res.status(400).send(errmsg)
      }
      const newproduct = await Product.create({
         name,
         description,
         brand,
         price,
         year,
         rating,
         stock,
         picture
      })

      await categoryProd.addProduct(newproduct)
      await subCatProd.addProduct(newproduct)
      if (category === 'wines') {
         await grapes.addProduct(newproduct)
      }
   } catch (error) {
      res.send(`Error in route /product ${error}`);
   }
   res.status(201).send(`A new ${category.substr(0, category.length - 1)} has been added`)
});

//Delete a product
router.delete('/:id', async (req, res) => {
   const { id } = req.params;
   try {
      const elem = await Product.destroy({
         where: { id: parseInt(id) }
      });
   } catch (error) {
      res.send(`Error in route.delete /product/:id ${error}`);
   }
   res.send('Product has been deleted');
});

//get to products and filters
router.get('/', async (req, res) => {
   try {
      // FILTROS GENERICOS
      //devuelve coincidencias aproximadas por nombre
      let { name } = req.query
      //devuelve por coincidencia exacta de id
      let { id } = req.query
      //devuelve por coincidencia exacta de marca
      let { brand } = req.query
      //devuelve por coincidencia exacta de precio
      let { price } = req.query
      //devuelve coincidencia exacta de año 
      let { year } = req.query
      //devuelve ordenados por el raiting especifico de cada producto (5-1)
      let { rating } = req.query
      //devuelve por coincidencia exacta de stock
      let { stock } = req.query

      if (name) {
         name = firstUpperCase(name.toLowerCase())
         let nombre = await filtrar.name(name)
         return res.json(nombre)
      }

      if (id) {
         const key = await filtrar.id(id)
         return res.json(key)
      }

      if (brand) {
         brand = firstUpperCase(brand.toLowerCase())
         const marca = await filtrar.brand(brand)
         return res.json(marca)
      }

      if (price) {
         const costo = await filtrar.price(price)
         return res.json(costo)
      }

      if (year) {
         const edad = await filtrar.year(year)
         return res.json(edad)
      }

      if (rating) {
         const start = await filtrar.rating(rating)
         return res.json(start)
      }

      if (stock) {
         const disponibles = await filtrar.stock(stock)
         return res.json(disponibles)
      }

      //════════════════════════════════════════════════════════════════════════════
      //FILTROS ESPECIFICOS
      //Para utilizar estos filtros se usan query, se usa el key y las opciones de value
      //especificadas en cada caso

      //devuelve ordenado por az o za "nombre" del producto
      let { azName } = req.query

      //devuelve ordenado por az o za "marca" del producto
      let { azBrand } = req.query

      //devuelve ordenados  por precio
      //expensive = desde el mas costoso al mas barato
      //cheap = el mas economico al mas costoso
      let { money } = req.query

      //devuelve ordenadoas por año
      //new = más  recientes primeros
      //old = más antiguos primeros
      let { age } = req.query

      //devuelve ordenadoas por stock disponible
      //more = más  recientes primeros
      //less = más antiguos primeros
      let { stockSort } = req.query


      if (azName) {
         const sort = await filtrar.azName(azName)
         return res.json(sort)
      }

      if (azBrand) {
         const sort = await filtrar.azBrand(azBrand)
         return res.json(sort)
      }

      if (money) {
         const dolar = await filtrar.money(money)
         return res.json(dolar)
      }

      if (age) {
         const old = await filtrar.age(age)
         return res.json(old)
      }

      if (stockSort) {
         const amount = await filtrar.stockSort(stockSort)
         return res.json(amount)
      }

      //devuelve todos los productos de manera predeterminada
      const all = await filtrar.allProducts()
      return res.json(all)
   }
   catch (error) {
      console.log(error)
      res.status(404).json("hay una falla en la ruta get, informale a la gente del back")
   }
});

//Update a product
router.put('/:id', async (req, res) => {
   const { id } = req.params;
   let { name, description, brand, price, year, stock, picture, category, subcategory, grape } = req.body;
   try {
      let Prod = await Product.findOne({
         where: { id: parseInt(id) }
      })
      if (Prod.name) {
         let changes = [];
         if (name) {
            Prod.name = name;
            changes.push('name')
         };
         if (description) {
            Prod.description = description;
            changes.push('description')
         }
         if (brand) {
            Prod.brand = brand;
            changes.push('brand')
         }
         if (price) {
            Prod.price = price;
            changes.push('price')
         }
         if (year) {
            Prod.year = year;
            changes.push('year')
         }
         if (stock) {
            Prod.stock = stock;
            changes.push('stock')
         }
         await Prod.save(changes);
      }
      //Update Category
      if (category) {
         let catProd = await Category.findOne({
            where: { name: category }
         })
         if (catProd === null) {
            res.send('Error in route.Put /product/:id Category not found.');
         }
         await catProd.addProduct(Prod)
      }
      //Update SubCategory
      if (subcategory) {
         let subCatProd = await SubCategory.findOne({
            where: { type: subcategory }
         })
         if (subCatProd === null) {
            res.send('Error in route.Put /product/:id SubCategory not found.');
         }
         await subCatProd.addProduct(Prod)
      }
      //Update Grape
      if (grape) {
         let grapeProd = await Grape.findOne({
            where: { name: grape }
         })
         if (grapeProd === null) {
            res.send('Error in route.Put /product/:id Grape not found.');
         }
         await grapeProd.addProduct(Prod)
      }

      res.send('Product has been updated.');
   } catch (error) {
      res.send(`Error in route.put /product/:id ${error}`);
   }
});

//cloudinary route
router.get('/cloudinary', async (req, res) => {
   cloudinary.config({
      cloud_name: api_name,
      api_key: api_key,
      api_secret: api_secret
   });
   console.log(cloudinary.url('sample'));
   console.log('Voy al upload')
   cloudinary.uploader.upload(
      "./img/Puna.jpg",
      {
         use_filename: true,
         unique_filename: false,
      },
      function (error, result) { console.log(error, result); }
   );
   res.send('cloudinary Done');
});

module.exports = router;
