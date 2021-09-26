const { Router } = require('express');
require('dotenv').config();
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

   if (!name) {
      res.status(400).json({ error: 'Name is required' })
   }
   if (!description) {
      res.status(400).json({ error: 'Description is required' })
   }
   if (isNaN(year)) {
      res.status(400).json({ error: 'Year is not a number' })
   }
   if (!brand) {
      res.status(400).json({ error: 'Brand is required' })
   }
   if (!price) {
      res.status(400).json({ error: 'Price is required' })
   }
   if (isNaN(stock) || stock < 0) {
      res.status(400).json({ error: `Error in stock value: ${stock}` })
   }

   try {
      //Find Category
      var categoryProd = await Category.findOne({
         where: { name: category.toLowerCase() }
      })

      if (categoryProd === null) {
         res.status(400).json({ error: 'Invalid Category' })
      }

      var subCatProd = await SubCategory.findOne({
         where: { type: subcategory.toLowerCase() }
      })

      if (subCatProd === null) {
         res.status(400).json({ error: 'Invalid SubCategory' })
      }

      if (category === 'wines') {
         // Find Grape
         var grapes = await Grape.findOne({
            where: { name: (grape[0].toUpperCase() + grape.slice(1)) }
         })

         if (grapes === null) {
            res.status(400).json({ error: 'Invalid Grape' })
         }
      }

      const newproduct = await Product.create({
         name: firstUpperCase(name.toLowerCase()),
         description,
         brand: firstUpperCase(brand.toLowerCase()),
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

      res.send("Su producto ha sido creado con éxito")
   } catch (error) {
      res.status(404).json(`Error in route /product ${error}`);
   }
});

//Delete a product
router.delete('/:id', async (req, res) => {
   const { id } = req.params;
   try {
      const elem = await Product.destroy({
         where: { id }
      });
      res.send('Product has been deleted');
   } catch (error) {
      res.status(404).send(`Error in route.delete /product/:id ${error}`);
   }
});

//get to products and filters
router.get('/', async (req, res) => {
   try {
      // FILTROS GENERICOS
      let { category } = req.query
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
         if (typeof nombre === "string") {
            return res.status(404).send(nombre)
         } else {
            return res.json(nombre)
         }
      }

      if (category) {
         category = category.toLocaleLowerCase()
         let allProducts = await filtrar.category(category)
         if (typeof allProducts === 'string') {
            return res.status(404).send(allProducts)
         } else {
            return res.json(allProducts)
         }
      }

      if (id) {
         const key = await filtrar.id(id)
         if (typeof key === "string") {
            return res.status(404).send(key)
         } else {
            return res.json(key)
         }
      }

      if (brand) {
         brand = firstUpperCase(brand.toLowerCase())
         const marca = await filtrar.brand(brand)
         if (typeof marca === "string") {
            return res.status(404).send(marca)
         } else {
            return res.json(marca)
         }
      }

      if (price) {
         const costo = await filtrar.price(price)
         if (typeof costo === "string") {
            return res.status(404).send(costo)
         } else {
            return res.json(costo)
         }
      }

      if (year) {
         const edad = await filtrar.year(year)
         if (typeof edad === "string") {
            return res.status(404).send(edad)
         } else {
            return res.json(edad)
         }
      }

      if (rating) {
         const start = await filtrar.rating(rating)
         if (typeof start === "string") {
            return res.status(404).send(start)
         } else {
            return res.json(start)
         }
      }

      if (stock) {
         const disponibles = await filtrar.stock(stock)
         if (typeof disponibles === "string") {
            return res.status(404).send(disponibles)
         } else {
            return res.json(disponibles)
         }
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
         if (typeof sort === "string") {
            return res.status(404).send(sort)
         } else {
            return res.json(sort)
         }
      }

      if (money) {
         const dolar = await filtrar.money(money)
         if (typeof dolar === "string") {
            return res.status(404).send(dolar)
         } else {
            return res.json(dolar)
         }
      }

      if (age) {
         const old = await filtrar.age(age)
         if (typeof old === "string") {
            return res.status(404).send(old)
         } else {
            return res.json(old)
         }
      }

      if (stockSort) {
         const amount = await filtrar.stockSort(stockSort)
         if (typeof amount === "string") {
            return res.status(404).send(amount)
         } else {
            return res.json(amount)
         }
      }

      //devuelve todos los productos de manera predeterminada
      const all = await filtrar.allProducts()
      if (all) {
         return res.json(all)
      } else {
         return res.status(404).json(all)
      }
   }
   catch (error) {
      console.log(error)
      res.status(404).json("hay una falla en la ruta get, informale a la gente del back")
   }
});

//Update a product
router.put('/:id', async (req, res) => {
   const { id } = req.params;
   let { name, description, brand, price, year, stock, category, subcategory, grape } = req.body;
   try {
      let prod = await Product.findOne({
         where: { id }
      })
      if (prod.name) {
         let changes = [];
         if (name) {
            prod.name = name;
            changes.push('name')
         };
         if (description) {
            prod.description = description;
            changes.push('description')
         }
         if (brand) {
            prod.brand = brand;
            changes.push('brand')
         }
         if (price) {
            prod.price = price;
            changes.push('price')
         }
         if (year) {
            prod.year = year;
            changes.push('year')
         }
         if (stock) {
            prod.stock = stock;
            changes.push('stock')
         }
         await prod.save(changes);
      }
      //Update Category
      if (category) {
         let catProd = await Category.findOne({
            where: { name: category }
         })
         if (catProd === null) {
            res.status(400).send('Error in route.Put /product/:id Category not found.');
         }
         await catProd.addProduct(prod)
      }
      //Update SubCategory
      if (subcategory) {
         let subCatProd = await SubCategory.findOne({
            where: { type: subcategory }
         })
         if (subCatProd === null) {
            res.status(400).send('Error in route.Put /product/:id SubCategory not found.');
         }
         await subCatProd.addProduct(prod)
      }
      //Update Grape
      if (grape) {
         let grapeProd = await Grape.findOne({
            where: { name: grape }
         })
         if (grapeProd === null) {
            res.status(400).send('Error in route.Put /product/:id Grape not found.');
         }
         await grapeProd.addProduct(prod)
      }

      res.send('Product has been updated.');
   } catch (error) {
      res.status(400).send(`Error in route.put /product/:id ${error}`);
   }
});

//cloudinary route
router.get('/cloudinary', (req, res) => {
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
