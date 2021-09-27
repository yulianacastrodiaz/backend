const { Router, request } = require('express');
const bodyParser = require('body-parser');
const router = Router();
require('dotenv').config();
const mercadopago = require('mercadopago');
//credenciales sandbox de MercadoPago
const { MERPA_PUBLIC_KEY, MERPA_ACCS_TOKEN } = process.env


// seteo credenciales
mercadopago.configure({
  access_token: MERPA_ACCS_TOKEN
});

router.post('/get-payment', (req, res) => {

  let {title, unit_price, quantity} = req.body
  unit_price = Number(unit_price);
  quantity= Number(quantity);

  let preference = {
    items: [
      {
        title: title,
        unit_price: unit_price,
        quantity: quantity,
      }
    ],
    back_urls: {
      "success": "http://localhost:3001/mepa/feedback",
      "failure": "http://localhost:3001/mepa/feedback",
      "pending": "http://localhost:3001/mepa/feedback",
    },
    auto_return: 'approved',
  };

    mercadopago.preferences.create(preference)
		.then(function (response) {
			// res.json({id :response.body.id})
      let sandbox = response.response.sandbox_init_point
			res.json(sandbox)
		}).catch(function (error) {
			console.log(error);
		});

});

router.get('/feedback', (req, res) => {
  let {payment_id, status, merchant_order_id} = req.query
  //la compra se cancelo
  if(payment_id === "null"){return res.json({ msg :`Ocurrio un error al intentar realizar el pago`})}
  //caso diferente de compra cancelada...
  res.json({
    Payment: payment_id,
    Status: status,
    MerchantOrder: merchant_order_id
  })
});

module.exports = router;