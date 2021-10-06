const { Router } = require('express');
const { Review } = require('../db');
const { Product, User } = require('../db');

const router = Router();

try {
  router.get('/:id', async(req, res) => {
    const { id } = req.params
    if(id !== undefined || id !== null){
      const product = await Product.findOne({ where: { id }, include: Review })
      if(product.dataValues.reviews.length > 0){
        for (let i = 0; i < product.dataValues.reviews.length; i++) {
          if(product.dataValues.reviews[i].userId){
            const reviewUser = await User.findByPk(product.dataValues.reviews[i].userId)
            product.dataValues.reviews[i].userName = `${reviewUser.name} ${reviewUser.lastname}`
            await product.save()
          }
        }
        res.json(product)
      } else {
        res.status(404).json({ msg: "El producto no tiene reviews" })
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
    const { comment, stars, product, userId } = req.body;
    if(!product) return res.status(404).json({ msg:"Debes mandar un id del producto" })
    const p = await Product.findOne({where: { id: product } })

    if(!userId){
      return res.status(404).json({ msg:"Debes mandar un id de usuario" })
    }

    if(comment){
      const newReview = await Review.create({
        comment,
        stars
      })
      const user = await User.findByPk(userId)
      if(user){
        await user.addReview(newReview)
      } else {
        return res.status(404).json({ msg:"Este usuario no existe" })
      }
      await p.addReview(newReview)
      
      res.json({ msg: "Tu review ha sido publicada"})
    } else {
      return res.status(404).json({ msg: "Debes pasar un comentario"})
    }
  })
} catch (error) {
  console.log(error)
  res.status(404).json(error)
}

module.exports = router;