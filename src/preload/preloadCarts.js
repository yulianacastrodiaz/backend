const {  Product, User,  Cart, Products_carts } = require('../db')


function preloadCarts(){
//Doy de alta usuarios    
  const users = [{
    mail: 'jorge.cantini@gmail.com',  
    username: 'jcantini',
    name: "Jorge",
    lastname: 'Cantini',
    password:'euw984wi',
    isAdmin: false
  },{
    mail: 'maraamati@gmail.com',  
    username: 'mamati',
    name: "Mara",
    lastname: 'Amati',
    password:'iwe9w4ijrw',
    isAdmin: false
  }]

  try {
    const newUsers = users.map(async(p) => {
      return await User.create({
        mail: p.mail,  
        username: p.username,
        name: p.name,
        lastname: p.lastname,
        password:p.password,
        isAdmin: false      })
    })
  
    Promise.all(newUsers)

  } catch (error) {
    return console.log(error)
  }
  

  const addCart = async function() { 
    try {
        const prodC1 = [
            {name:"El Enemigo", cant:6},
            {name:"Johnnie Walker 18 años", cant:1},
            {name:"Mendel Rosadia", cant:2},
            {name:"Potrero Chardonnay", cant:3}
        ]    
        const prodC2 = [
            {name:"Manos Negras Chardonnay", cant:3},
            {name:"Colonia las Liebres Bonarda", cant:4},
            {name:"Aberlour Single Malt 12", cant:1},
        ]    
        const prodC3 = [
          {name:"Chivas Regal Mizunara", cant:1},
          {name:"La Posta Rosé de Malbec", cant:6},
          {name:"Trivento White Malbec", cant:3},
      ]    
    //Doy de alta Carts y lo vinculo al usuario
        const Cart1 = await Cart.create({
           state: 'in process',  
           payment_method: 'MERCADOPAGO',
        })
        const userid1 = await User.findOne({where: { username: 'jcantini' }})
        await userid1.addCart(Cart1)
        prodC1.map( async (p) => {
               const prod1 = await Product.findOne({where: { name: p.name }})
               await Cart1.setProducts(prod1, { through: { quantity: p.cant } })
        })

        const Cart2 = await Cart.create({
           state: 'finished',  
           payment_method: 'PAYPAL',
        })
        const userid2 = await User.findOne({where: { username: 'mamati' }})
        await userid2.addCart(Cart2)
        prodC2.map( async (p) => {
            const prod2 = await Product.findOne({where: { name: p.name }})
            await Cart2.setProducts(prod2, { through: { quantity: p.cant } })
        })
        
        const Cart3 = await Cart.create({
          state: 'finished',  
          payment_method: 'PAYPAL',
       })
       const userid3 = await User.findOne({where: { username: 'mamati' }})
       await userid3.addCart(Cart3)
       prodC3.map( async (p) => {
           const prod3 = await Product.findOne({where: { name: p.name }})
           await Cart3.setProducts(prod3, { through: { quantity: p.cant } })
       })
    } catch (error) {
      return console.log(error)
    }
  }    
  addCart();
}
module.exports = preloadCarts;