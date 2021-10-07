const { Router } = require('express');
require('dotenv').config();
const { Product, User, Wishlist, wlist_prods} = require('../db')
const log = console.log;

const router = Router();

//Delete a product from the wishlist
router.delete('/', async (req, res) => {
    const { userid, prodid } = req.body;
    try {
      const wlist = await Wishlist.findOne({ 
         where: { userId : userid }
      })
      const wlprod = await wlist_prods.findAll({ 
         where: { 
            productId : prodid, 
            wishlistId: wlist.id 
         } 
      })
      const prod = await Product.findOne({
            where: { id : prodid}
      });
      wlist.removeProduct(prod)
      res.send('Product has been deleted from wishlist');
    } catch (error) {
       res.status(404).send(`Error in route.delete /product/:id ${error}`);
    }
 });
 
// Muestra la wishlist de un usuario
router.get('/:id', async (req, res) => {
   const { id } = req.params
   log('Id: ', id)
   try {
     const result = await Wishlist.findAll({
       where: {userId : id},
       attributes: ['userId'],
       include: [
          {
           model: Product,
           attributes: ['name', 'picture', 'id'],
           through: {
            attributes: []
          }
         }]
     });
     if (!result.length) {
       return res.status(400).send('No wishlist found')
     } 
     res.json(result)
   } catch (error) {
     res.send('Error: ', error)
   }
 });

//Add a product to the wishlist
router.put('/', async (req, res) => {
    const { userid, productid } = req.body;
    try {
       let wlist = await Wishlist.findOne({ where: { userId: userid }})
       if (wlist === null) {
           wlist = await Wishlist.create();
           const user = await User.findOne({ where: { id: userid }})
           await user.setWishlist(wlist)
       }
      
        const prod = await Product.findOne({where: { id: productid }})
        const result = await wlist.addProduct(prod) 
        res.send('Wishlist has been updated.');
    } catch (error) {
       res.status(400).send(`Error in route.put /wishl ${error}`);
    }
 });

 
module.exports = router;
  