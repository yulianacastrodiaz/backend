const { Router } = require('express');
const bodyParser = require('body-parser');
const router = Router();
require('dotenv').config();
const mercadopago = require('mercadopago');
const { MERPA_PUBLIC_KEY, MERPA_ACCS_TOKEN } = process.env
const { Cart } = require('../db')
const { Product } = require('../db')
const { Products_carts } = require('../db')



const firstUpperCase = function (mayus) { return mayus.replace(/\b\w/g, l => l.toUpperCase()) }


// seteo credenciales
mercadopago.configure({
  access_token: MERPA_ACCS_TOKEN
});

//middleware para setear el producto y buscar el carrito
router.use('/get-payment', async (req, res, next) => {
  try {
    let change = preference.items[0]

    let { price, orderid } = req.body

    preference.client = orderid

    price = Number(price);
    change.unit_price = price;

    let clientFound = await Cart.findAll({
      where: { id: orderid },
    })

    if (!preference.client) {
      res.status(404).json(`No fue posible encontrar el carrito del cliente`)
    }

    let CartProductFound = await Products_carts.findAll({
      where: { cartId: orderid },
      attributes: ['quantity', 'productId']
    })
    
    if (await CartProductFound.length > 1) { change.title = "Productos"; }
    if (await CartProductFound.length === 1) {
      let prodId = await CartProductFound[0].dataValues.productId

      let prodData = await Product.findOne({
        where: { id: prodId },
        attributes: ['name', 'picture']
      })

      change.title = prodData.dataValues.name
      change.picture_url = prodData.dataValues.picture
    }
    return next()

  } catch (error) {
    console.log(error)
    res.status(404).json("Ocurrio un problema inesperado, revise el id del carrito proporcionado")
  }

});

//seteo del producto (modificable por el middleware)
let preference = {
  items: [
    {
      title: "Elementos",
      picture_url: "https://i.ibb.co/c83qw1s/B7ua5pw-Ig-AAsvw-M.png",
      unit_price: 56,
      quantity: 1,
    }
  ],
  back_urls: {
    "success": "http://localhost:3001/mepa/feedback",
    "failure": "http://localhost:3001/mepa/feedback",
    "pending": "http://localhost:3001/mepa/feedback",
  },
  auto_return: 'approved',
  client: "",
};


router.post('/get-payment', async (req, res) => {

  preference; //producto listo para cobrar el pago
  mercadopago.preferences.create(preference)
    .then(function (response) {
      // console.log( response)
      // res.json({id :response.body.id})
      let urlPay = response.response.sandbox_init_point

      res.json(urlPay)
    }).catch(function (error) {
      console.log(error);
    });
});



router.get('/feedback', async (req, res) => {
  try {
    preference;
    let { payment_id, status, merchant_order_id } = req.query;

    (status === "approved") ? status = "SUCCESS"
      : (status === "in_process") ? status = "SUCCESS"
        : status = "FAILURE";

    const newTicket = {
      payment_method: "MERCADOPAGO",
      operationCode: `${payment_id}-${merchant_order_id}`,
      paymentStatus: status
    }

    await Cart.update({
      payment_method : "MERCADOPAGO",
      paymentStatus : status,
      operationCode: newTicket.operationCode,
    },{
      where: { id: preference.client }
    })
    

    //la compra se cancelo
    if (status === "FAILURE") {
      return res.json({ msg: `Ocurrio un error al intentar realizar el pago` })
    }
    res.json({
      msg: `la compra se realizo de manera satisfactoria, ya puedes cerrar esta ventana`
    })

  } catch (error) {
    console.log("problema:",error)
    res.status(404).json("Ocurrio un problema inesperado")
  }
});



module.exports = router;