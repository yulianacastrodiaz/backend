const e = require('express');
const { Router } = require('express');
const { Grape } = require('../db')
const { Product } = require('../db')
const router = Router();

try {
  router.get('/', async(req, res) => {
    const grapesDB = await Grape.findAll()
    res.json(grapesDB)
  })
} catch (error) {
  console.log(error)
  res.status(404).json
}


try {
  router.post('/', async(req, res) => {
    const { name } = req.body;
    if(name) {
      const newGrape = await Grape.create({ name })
      res.json(newGrape)
    } else {
      res.status(400).json({msg: "Por favor manda el nombre de la uva"})
    }
  })
} catch (error) {
  console.log(error)
  res.status(404).json(error)
}

module.exports = router;