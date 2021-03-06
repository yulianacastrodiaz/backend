const { Router } = require('express');
const { Cart } = require('../db')
const { Product } = require('../db')
const { User } = require('../db')
const { Products_carts } = require('../db')
const router = Router();

router.put('/', async (req, res) => {
  try {
    const cartId = req.query.id
    const { userId, products, state, payment_method, shipping } = req.body;
    if (cartId) {
      const { action, idProduct } = req.body;
      const cartdb = await Cart.findOne({ where: { id: cartId }, include: Product })
      if (cartdb) {
        if (action === "finished") {
          const { payment_method } = req.body
          if(payment_method){
            cartdb.payment_method = payment_method.toUpperCase(),
            cartdb.state = "finished" 
            await cartdb.save()
          } else {
            return res.status(400).json({ msg: "Falta el método de pago para finalizar la compra"})
          }
        }
        if (action === "cancelled") {
          cartdb.state = "cancelled"
          await cartdb.save()
        }
        if (action === "add") {
          for (let i = 0; i < cartdb.products.length; i++) {
            if (cartdb.products[i].id === idProduct) {
              const aux = await Products_carts.findOne({ where: { productId: idProduct, cartId } })
              if (aux) {
                aux.quantity = aux.quantity + 1;
              }
              await aux.save()
            }
            await cartdb.save();
          }
        }
        if (action === "remove") {
          for (let i = 0; i < cartdb.products.length; i++) {
            if (cartdb.products[i].id === idProduct) {
              if ((cartdb.products[i].products_carts.quantity - 1) <= 0) {
                const deleteProduct = await Products_carts.destroy({ where: { cartId, productId: cartdb.products[i].id } });
              } else {
                const aux = await Products_carts.findOne({ where: { productId: idProduct, cartId } })
                if (aux) {
                  aux.quantity = aux.quantity - 1;
                }
                await aux.save();
              }
            }
            await cartdb.save();
          }
        }
        if (action === "addproduct") {
          const productdb = await Product.findOne({ where: { id: idProduct }, include: Cart })
          if (productdb) {
            if (productdb.carts.length) {
              for (let i = 0; i < productdb.carts.length; i++) {
                if (productdb.carts[i].dataValues.id === cartId) {
                  if (productdb.carts[i].dataValues.products_carts.quantity >= 1) {
                    const aux = await Products_carts.findOne({ where: { productId: idProduct, cartId } })
                    if (aux) {
                      aux.quantity = aux.quantity + 1;
                    }
                    await aux.save()
                    await cartdb.save();
                  }
                }
              }
            } else {
              await cartdb.addProduct(productdb, { through: { quantity: 1 } })
              await cartdb.save();
            }

          } else {
            return res.status(404).json({ msg: "El producto que intenta agregar no existe" })
          }
        }
        if (action === "removeproduct") {
          const deleteProduct = await Products_carts.destroy({ where: { cartId, productId: idProduct } });
          cartdb.save();
        }

        await cartdb.save();
        const aux = await Cart.findOne({ where: { id: cartId }, include: Product })
        return res.json(aux)
      } else {
        return res.status(404).json({ msg: `No existe ningún carrito con este id:${cartId}` })
      }
    }
    if (!userId) {
      return res.status(400).json({ msg: "Se necesita el id del usuario" })
    } else if (state === "in process" || state === "cancelled" || state === "finished" || state === null || state === undefined) {
      const cartOfUser = await Cart.findAll({ where: { userId } })
      if (cartOfUser.length) {
        for (let i = 0; i < cartOfUser.length; i++) {
          if (cartOfUser[i].state === "in process") {
            return res.status(400).json({ msg: "No se puede crear un carrito porque el usuario tiene una compra en proceso" })
          }
        }
      }
      if (state === null || state === undefined) state === "in process";
      if (payment_method) payment_method = payment_method.toUpperCase();

      const newCart = await Cart.create({
        state,
        payment_method,
        shipping
      })
      if (newCart) {
        const userdb = await User.findByPk(userId)
        if (!userdb) return res.status(404).json({ msg: "El usuario no existe" })
        userdb.addCart(newCart)
      }
      if ( products !== undefined && products.length >= 1 ) {
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
            const cartdb = Cart.findOne({ where: { id: newCart.id }, include: Product });
            return cartdb;
          })
          .then((cartdb) => {
            return res.json({ cartdb, msg: `Su orden fue tomada con éxito. Este es el id ${newCart.id}` })
          })
          .catch((error) => {
            console.log(error)
            res.status(404).json(error)
          })
      } else {
        const cartdb = await Cart.findOne({ where: { id: newCart.id }, include: Product });
        newCart.save()
        return res.json({ newCart: cartdb, msg: `Su orden fue tomada con éxito. Este es el id ${cartdb.id}` })
      }
    } else {
      return res.status(400).json({ msg: "El estado debe ser uno válido: 'in process', 'cancelled' o 'finished' " })
    }
  } catch (error) {
    console.log(error)
    res.status(404).json(error)
  }
})

//Muestra todas las ordenes para el administrador
router.get('/admin', async (req, res) => {
  try {
    const result = await Cart.findAll({
      attributes: ['state', 'payment_method', 'createdAt'],
      include: [
        {
          model: User,
          attributes: ['name', 'lastname']
        },
        {
          model: Product,
          attributes: ['id','name', 'price','picture'],
          through: {
            attributes: ['quantity']
          }
        }]
    });
    if (!result.length) {
      return res.status(400).send('No orders found')
    } 
    res.json(result)
  } catch (error) {
    res.send('Error: ', error)
  }
});

// Muestra una orden para un Id
router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const result = await Cart.findAll({
      where: { userId: id },
      attributes: ['state', 'payment_method', 'createdAt', 'orderid', 'paymentStatus'],
      include: [
        {
          model: User,
          attributes: ['name', 'lastname']
        },
        {
          model: Product,
          attributes: ['id','name', 'price','picture'],
          through: {
            attributes: ['quantity']
          }
        }]
    });
    if (!result.length) {
      return res.status(400).send('No order found')
    } 
    res.json(result)
  } catch (error) {
    res.send('Error: ', error)
  }
});

// Muestra una ordenes para un usuario
router.get('/', async (req, res) => {
  const { userid, state } = req.query
  let condition = {}
  if (state === 'activas') {
    condition.userId = userid
    condition.state = 'in process'
  } else {
    condition.userId = userid
    condition.state = ['cancelled', 'finished']
  }
  try {
    const result = await Cart.findAll({
      where: condition,
      attributes: ['state', 'payment_method', 'createdAt'],
      include: [
        {
          model: User,
          attributes: ['name', 'lastname', 'mail']
        },
        {
          model: Product,
          attributes: ['name', 'price', 'picture', 'id'],
          through: {
            attributes: ['quantity']
          }
        }]
    });
    if (!result.length) {
      return res.status(400).send('No orders found')
    } 
    res.json(result)
  } catch (error) {
    res.send('Error: ', error)
  }
});

module.exports = router;