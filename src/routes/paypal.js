const { Router } = require('express');
const router = Router();
const bodyParser = require('body-parser');
// router.use(bodyParser.json())
const request = require('request');

require('dotenv').config();


//credenciales de variables de entorno
const { PAYPAL_CLIENT, PAYPAL_SECRET, PAYPAL_API } = process.env

const auth = { user: PAYPAL_CLIENT, pass: PAYPAL_SECRET }


// midleware para cambiar el precio del producto
router.use('/get-payment', (req, res, next) => {

    let change = body.purchase_units[0].amount
    let { currency_code, value } = req.body
    currency_code = currency_code.toUpperCase()
    
    //validaciones para "currency_code"
    if (typeof currency_code !== "string") { return res.status(404).json(`El campo currency_code solo admite datos del tipo string`) }

    if (currency_code === "USD" || currency_code === "MXN" || currency_code === "EUR") {
        //se setea la moneda de pago
        change.currency_code = currency_code
    } else { return res.status(404).json(`Revise los codigos monetarios admitidos ['EUR', 'MXN', 'USD']`) }



    //validaciones para el "value"
    if (typeof value === "number") {
        return res.status(404).json(`Revisar el campo del precio (${value}) que se esta intentando enviar, solo se admiten string numericos separados por punto de ser necesarios`)
    }
    if (typeof value === "string") {
        //remplaza comas por puntos
        value = value.replace(/,/g, ".");
        //revisa que sean solo numeros y/o separados con punto y cambia el valor de lo que cobramos
        /^[0-9]*(\.?)[0-9]+$/.test(value) ? change.value = value
            : res.status(404).json(`Revisar el campo del precio (${value}) que se esta intentando enviar, solo se admiten string numericos separados por punto de ser necesarios`)
    }
    next()
})

//Necesario para llamar a la ruta del pago (usado por createPayment)
let body = {
    intent: 'CAPTURE',
    purchase_units: [{
        amount: {
            currency_code: 'USD',
            value: '150'
        }
    }],
    application_context: {
        brand_name: `eWines`, //Nombre a mostrar de la empresa
        landing_page: 'NO_PREFERENCE', //
        user_action: 'PAY_NOW', //con esto paypal mostrara el montó que se esta intentando cobrar
        return_url: 'http://localhost:3001/paypal/validated-payment',
        cancel_url: 'http://localhost:3001/paypal/canceled-payment', //deberia rutear al frontend
    }
}


const createPayment = (req, res) => {
    body;
    request.post(`${PAYPAL_API}/v2/checkout/orders`, {
        auth,
        body,
        json: true
    }, (err, response) => {
        res.json({ data: response.body })
    })
}

const executePayment = (req, res) => {
    const token = req.query.token
    console.log("el executor saco plata")
    request.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {
        auth,
        body: {},
        json: true
    }, (err, response) => {
        res.json({ data: response.body }) // como devuelvo sin que vea el cliente se devuelve la informacion completa del pago
    })
}



router.post('/get-payment', createPayment)

router.get('/validated-payment', executePayment)

//ruta provisoria, deberia ser del front
router.get('/canceled-payment', (req, res) => {
    const token = req.query.token
    let body = {msg:`El pago ${token} no pudo llevarse a cabo.
    Por uno de los siguientes motivos:
    *El cliente cancelo la compra
    *Las credenciales no son las correctas, reviselas
    *Intente cambiar de metodo de pago e intente nuevamente`}
    return res.status(200).json(body)
})

module.exports = router;