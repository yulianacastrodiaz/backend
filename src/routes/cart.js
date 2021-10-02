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
          // await cartdb.products.forEach(async (product) => {
          //   if (product.id === idProduct) {
          //     if ((product.products_carts.quantity - 1) <= 0) {
          //       const deleteProduct = await Products_carts.destroy({ where: { cartId, productId: product.id } });
          //     } else {
          //       const aux = await Products_carts.findOne({ where: { productId: idProduct, cartId } })
          //       if (aux) {
          //         aux.quantity = aux.quantity - 1;
          //       }
          //       aux.save()
          //     }
          //   }
          //   cartdb.save();
          // });
        }
        if (action === "addproduct") {
          const productdb = await Product.findByPk(idProduct)
          if (productdb) {
            //user.addProject(project, { through: { role: 'manager' }});
            await cartdb.addProduct(productdb, { through: { quantity: 1 } })
            await cartdb.save();
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
    } else if (!products) {
      return res.status(400).json({ msg: "Son necesarios los productos" })
    } else if (state === "in process" || state === "cancelled" || state === "finished" || state === null || state === undefined) {
      if (state === null || state === undefined) state === "in process";
      if (payment_method) payment_method = payment_method.toUpperCase()
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
      return res.status(400).json({ msg: "El estado debe ser uno válido: 'in process', 'cancelled' o 'finished' " })
    }
  } catch (error) {
    console.log(error)
    res.status(404).json(error)
  }
})


router.get('/:id', async (req, res) => {
  const { id } = req.params
  console.log('Order: ', id)
  try {
    const result = await Cart.findAll({
      where: { orderid: id },
      attributes: ['state', 'payment_method'],
      include: [
        {
          model: User,
          attributes: ['name', 'lastname']
        },
        {
          model: Product,
          attributes: ['name', 'price'],
          through: {
            attributes: ['quantity']
          }
        }]
    });
    const order = {}
    order.uname = result[0].user.name
    order.ulastname = result[0].user.lastname
    order.products = result[0].products.map(p => {
      return {
        name: p.name,
        price: p.price,
        quantity: p.products_carts.quantity
      }
    })
    res.status(200).json(order)
  } catch (error) {
    res.send('Error: ', error)
  }
});

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
          attributes: ['name', 'price'],
          through: {
            attributes: ['quantity']
          }
        }]
    });
    if (!result.length) return res.status(400).send('No orders found')
    return res.json(result)
    const order = {}
    const date = new Date(result[0].createdAt)
    const dia = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    order.uname = result[0].user.name
    order.ulastname = result[0].user.lastname
    order.state = result[0].state
    order.payment_method = result[0].payment_method
    order.created = dia
    order.products = result[0].products.map(p => {
      return {
        name: p.name,
        price: p.price,
        quantity: p.products_carts.quantity
      }
    })

    res.status(200).json(order)
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
          attributes: ['name', 'price'],
          through: {
            attributes: ['quantity']
          }
        }]
    });
    const order = {}
    const date = new Date(result[0].createdAt)
    const dia = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    order.uname = result[0].user.name
    order.ulastname = result[0].user.lastname
    order.orderid = result[0].orderid
    order.paymentStatus = result[0].paymentStatus
    order.state = result[0].state
    order.payment_method = result[0].payment_method
    order.created = dia
    order.products = result[0].products.map(p => {
      return {
        name: p.name,
        price: p.price,
        quantity: p.products_carts.quantity
      }
    })
    res.status(200).json(order)
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
          attributes: ['name', 'lastname']
        },
        {
          model: Product,
          attributes: ['name', 'price'],
          through: {
            attributes: ['quantity']
          }
        }]
    });
    if (!result.length) return res.status(400).send('No orders found')
    const order = {}
    const date = new Date(result[0].createdAt)
    const dia = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    order.uname = result[0].user.name
    order.ulastname = result[0].user.lastname
    order.state = result[0].state
    order.payment_method = result[0].payment_method
    order.created = dia
    order.products = result[0].products.map(p => {
      return {
        name: p.name,
        price: p.price,
        quantity: p.products_carts.quantity
      }
    })

    res.status(200).json(order)
  } catch (error) {
    res.send('Error: ', error)
  }
});

module.exports = router;