const { Router } = require('express');
const { Review } = require('../db');
const { Product } = require('../db');

const router = Router();

try {
  router.get('/:id', async(req, res) => {
    const { id } = req.params
    if(id){
      const product = await Product.findOne({ where: { id }, include: Review })
      if(product.dataValues.reviews.length > 0){
        res.json(product)
      } else {
        res.status(404).json({ msg: "El prodcuto no tiene reviews" })
      }
    } else {
      res.status(404).json({ msg: "Debes pasar un id" })
    }
  })
} catch (error) {
  console.log(error)
  res.status(404).json(error)
}

try {
  router.put('/', async(req, res) => {
    const { newcomment, newstars, id } = req.body
    const review = await Review.findByPk(id)

    if(newcomment){
      review.comment = newcomment
    }

    if(newstars){
      review.stars = newstars
    }
    review.save()
    res.json({msg: "Su review ha sido actualizada con éxito"})
  })
} catch (error) {
  console.log(error)
  res.status(404).json(error)
}

try {
  router.post('/', async(req, res) => {
    const { comment, stars, product } = req.body;
    const p = await Product.findOne({where: { id: product } })
    const newReview = await Review.create({
      comment,
      stars
    })
    await p.addReview(newReview)
    res.json({ msg: "Tu review ha sido publicada"})
  })
} catch (error) {
  console.log(error)
  res.status(404).json(error)
}

module.exports = router;