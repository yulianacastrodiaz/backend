const { Router } = require('express');
const bodyParser = require('body-parser');
const router = Router();
require('dotenv').config();
const mercadopago = require('mercadopago');
const { MERPA_PUBLIC_KEY, MERPA_ACCS_TOKEN } = process.env
const { Cart } = require('../models/Cart');


const firstUpperCase = function (mayus) { return mayus.replace(/\b\w/g, l => l.toUpperCase()) }


// seteo credenciales
mercadopago.configure({
  access_token: MERPA_ACCS_TOKEN
});

//middleware para setear el producto y buscar el carrito
router.use('/get-payment', async (req, res, next) => {

  let change = preference.items[0]

  let { title, unit_price, quantity, orderid } = req.body

  preference.client = orderid
  unit_price = Number(unit_price);
  quantity = Number(quantity);
  title = firstUpperCase(title.toLowerCase())

  change.title = title;
  change.unit_price = unit_price;
  change.quantity = quantity;

  /* let clientFound = await Cart.findOne({
    where: { orderid: user },
  }) */

  // if(clientFound > 0){
  console.log(await preference)
  if (preference.client > 0) {
    return next()
  }
  res.status(404).json(`No se encontro la orden ${preference.client} en el carrito del cliente`)

});

//seteo del producto (modificable por el middleware)
let preference = {
  items: [
    {
      title: "producto",
      unit_price: 56,
      quantity: 2,
    }
  ],
  back_urls: {
    "success": "http://localhost:3001/mepa/feedback",
    "failure": "http://localhost:3001/mepa/feedback",
    "pending": "http://localhost:3001/mepa/feedback",
  },
  auto_return: 'approved',
  client: 0,
};


router.post('/get-payment', async (req, res) => {

  preference; //producto listo para cobrar el pago
  mercadopago.preferences.create(preference)
    .then(function (response) {
      // res.json({id :response.body.id})
      let urlPay = response.response.init_point

      res.json(urlPay)
    }).catch(function (error) {
      console.log(error);
    });
});



router.get('/feedback', async (req, res) => {
  try {
    let { payment_id, status, merchant_order_id } = req.query
    let client = preference.client

    console.log("Cliente numero", client, "compra:", status);

    (status === "approved") ? status = "SUCCESS"
      : (status === "in_process") ? status = "PENDING"
        : status = "FAILURE";

    const newTicket = {
      payment_method: "MERCADOPAGO",
      operationCode: `${payment_id}-${merchant_order_id}`,
      paymentStatus: status
    }

    console.log(newTicket)

    // await Cart.update(newTicket,{
    //   where: { orderid: preference.client }
    // })

    //la compra se cancelo
    if (status === "FAILURE") {
      return res.json({ msg: `Ocurrio un error al intentar realizar el pago` })
    }
    res.json({
      msg: `la compra se realizo de manera satisfactoria`
    })

  } catch (error) {
    console.log(error)
    res.status(404).json("Ocurrio un problema inesperado")
  }
});



module.exports = router;