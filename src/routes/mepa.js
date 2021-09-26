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

//objeto de preferencias
/*let preference = {
  items: [
    {
      title: 'Pack de x6 Cerveza Corona lata 473ml',
      unit_price: 420,
      quantity: 1,
    }
  ],
  back_urls: {
    "success": "http://localhost:3001/mepa/feedback",
    "failure": "http://localhost:3001/mepa/feedback",
    "pending": "http://localhost:3001/mepa/feedback",
  },
  auto_return: 'approved',
};*/




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


  /* const response = await mercadopago.preferences.create(preference)
  const preferenceId= response.body.id
    .then(function (response) {
      // Este valor reemplazará el string "<%= global.id %>" en tu HTML
      global.id = response.body.id;
    }).catch(function (error) {
      console.log(error);
    });

    res.send({preferenceId}) */

    mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({id :response.body.id})
		}).catch(function (error) {
			console.log(error);
		});



});

router.post('/feedback', (req, res) => {
  let {payment_id, status, merchant_order_id} = req.query
  res.json({
    Payment: payment_id,
    Status: status,
    MerchantOrder: merchant_order_id
  })
});

module.exports = router;