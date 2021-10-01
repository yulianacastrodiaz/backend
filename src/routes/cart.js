const { Router } = require('express');
const { User } = require('../db')
const { Product } = require('../db')
const { Cart } = require('../db')

const router = Router();

// Muestra una orden para un Id
router.get('/:id', async(req, res) => {
   const { id } = req.params
   try {
     const result = await Cart.findAll({
         where : {userId: id},
         attributes: ['state','payment_method','createdAt', 'orderid', 'paymentStatus'],    
         include: [
          { model: User,
            attributes: ['name','lastname']},
          { model: Product,
            attributes: ['name','price'],
            through: {
                attributes: ['quantity']
            }
          }] 
     }); 
     const order= {}
     const date = new Date(result[0].createdAt)
     const dia = date.getDate() + '/' + (date.getMonth()+1)  + '/' + date.getFullYear()
     order.uname = result[0].user.name
     order.ulastname = result[0].user.lastname
     order.orderid = result[0].orderid
     order.paymentStatus = result[0].paymentStatus
     order.state = result[0].state
     order.payment_method = result[0].payment_method
     order.created = dia
     order.products = result[0].products.map( p => {
               return {
                 name : p.name,
                 price : p.price,
                 quantity : p.products_carts.quantity
               }
             })
     res.status(200).json(order) 
   } catch (error) {
       res.send('Error: ', error)
   }
});


// Muestra una ordenes para un usuario
router.get('/', async(req, res) => {
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
          where : condition,
          attributes: ['state','payment_method','createdAt'],    
          include: [
           { model: User,
             attributes: ['name','lastname']},
           { model: Product,
             attributes: ['name','price'],
             through: {
                 attributes: ['quantity']
             }
           }] 
      }); 
      if (!result.length) return res.status(400).send('No orders found')
      const order= {}
      const date = new Date(result[0].createdAt)
      const dia = date.getDate() + '/' + (date.getMonth()+1)  + '/' + date.getFullYear()
      order.uname = result[0].user.name
      order.ulastname = result[0].user.lastname
      order.state = result[0].state
      order.payment_method = result[0].payment_method
      order.created = dia
      order.products = result[0].products.map( p => {
                return {
                  name : p.name,
                  price : p.price,
                  quantity : p.products_carts.quantity
                }
              })
        
      res.status(200).json(order) 
    } catch (error) {
        res.send('Error: ', error)
    }
 });
module.exports = router;