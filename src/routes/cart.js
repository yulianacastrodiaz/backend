const { Router } = require('express');
const { User } = require('../db')
const { Product } = require('../db')
const { Cart } = require('../db')

const router = Router();

 router.get('/:id', async(req, res) => {
   const { id } = req.params
   console.log('Order: ', id)
   try {
     const result = await Cart.findAll({
         where : {orderid: id},
         attributes: ['state','payment_method'],    
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
     order.uname = result[0].user.name
     order.ulastname = result[0].user.lastname
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