const { Router } = require('express');
const { Cart } = require('../db')
const { Product } = require('../db')
const { User } = require('../db')
const router = Router();

router.put('/', async (req, res) => {
  try {
    const { userId, products, state, cartId, payment_method, shipping} = req.body;
    if (!userId) {
      return res.status(400).json({ msg: "Se necesita el id del usuario" })
    } else if (!products) {
      return res.status(400).json({ msg: "Son necesarios los productos" })
    } else if (state === "in process" || state === "cancelled" || state === "finished" || state === null || state === undefined) {
      if (cartId) {
        const cartdb = await Cart.findByPk({id: cartId})
        if (cartdb){
          cartdb.state = state;
          if(payment_method){
            cartdb.payment_method = payment_method;
          }
          if(shipping){
            cartdb.shipping = shipping;
          }
          
        } else {
          return res.status(404).json({ msg: "El id es inválido"})
        }
      } else {
        if(state === null || state === undefined) state === "in process";
        const newCart = await Cart.create({ 
          state,
          payment_method,
          shipping })
        if (newCart) {
          const userdb = await User.findByPk(userId)
          if (!userdb) return res.status(404).json({ msg: "El usuario no existe" })
          userdb.addCart(newCart)
        }

        const allProducts = await products.map(async (p) => {
          const productdb = await Product.findOne({ where: { id: p.productId } })
          return {
            productdb,
            quantity: p.quantity
          };
        })

        Promise.all(allProducts)
          .then((data) => {
            const aux = data.map(async (response) => {
              return await newCart.setProducts([response.productdb], { through: { quantity: response.quantity } })
            })
            return Promise.all(aux)
          })
          .then(() => {
            res.send(`Su orden fue tomada con éxito. Este es el id ${newCart.id}` )
          })
          .catch((error) => {
            console.log(error)
            res.status(404).json(error)
          })
      }
    } else {
      return res.status(400).json({ msg: "El estado debe ser uno válido: 'in process', 'cancelled' o 'finished' " })
    }
  } catch (error) {
    console.log(error)
    res.status(404).json(error)
  }
})

module.exports = router;