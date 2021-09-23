const { Router } = require('express');
const express = require('express');
const { Product, Category, SubCategory, Grape } = require('../db')
const filtrar = require('./filters.js')

const router = Router();
// Router.use(express.json());


// router.use(express.json());
const firstUpperCase = function (mayus) { return mayus.replace(/\b\w/g, l => l.toUpperCase()) }

//Add a product to the database
router.post('/', async (req, res) => {
   let { name, description, price, year, rating, picture, category, subcategory, grape } = req.body;
   let errmsg = {};

   if (!name) {
      errmsg.name = 'Name is required'
   } else {
      if (!description) {
         errmsg.desc = 'Description is required'
      } else {
         if (isNaN(year)) {
            errmsg.year = 'Year is not a number'
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
         price,
         year,
         rating,
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
      //devuelve por coincidencia exacta de precio
      let { price } = req.query
      //devuelve coincidencia exacta de año 
      let { year } = req.query
      //devuelve ordenados por el raiting especifico de cada producto (5-1)
      let { rating } = req.query

      if (name){
         name = firstUpperCase(name.toLowerCase())
         let nombre = await filtrar.name(name)
         return res.json(nombre)
      }

      if(id){
         const key = await filtrar.id(id)
         return res.json(key)}
      
      if(price){
         const costo = await filtrar.price(price)
         return res.json(costo)}
      
      if(year){
         const edad = await filtrar.year(year)
         return res.json(edad)}

      if(rating){
         const start = await filtrar.rating(rating)
         return res.json(start)}

      //════════════════════════════════════════════════════════════════════════════
      //FILTROS ESPECIFICOS
      //Para utilizar estos filtros se usan query, se usa el key y las opciones de value
      //especificadas en cada caso

      //devuelve ordenado por az o za 
      let { az } = req.query

      //devuelve ordenados  por precio
      //expensive = desde el mas costoso al mas barato
      //cheap = el mas economico al mas costoso
      let { money } = req.query

      //devuelve ordenadoas por año
      //new = más  recientes primeros
      //old = más antiguos primeros
      let { age } = req.query


      if(az){ 
         const sort= await filtrar.az(az) 
         return res.json(sort)}

      if(money){
         const dolar = await filtrar.money(money)
         return res.json(dolar)}

      if(age){
         const old = await filtrar.age(age)
         return res.json(old)}

      //devuelve todos los productos de manera predeterminada
      const all = await filtrar.allProducts()
      return res.json(all)
   }
   catch (error) { 
      console.log(error)
      res.status(404).json("hay una falla en la ruta get, informale a la gente del back") }
});

module.exports = router;
