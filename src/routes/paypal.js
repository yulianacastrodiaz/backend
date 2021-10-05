const { Router } = require('express');
const router = Router();
const bodyParser = require('body-parser');
// router.use(bodyParser.json())
const request = require('request');
require('dotenv').config();
const { Cart } = require('../db')
const { User } = require('../db')
const msg = require('../emailTemplates/payMsg')




//credenciales de variables de entorno
const { PAYPAL_CLIENT, PAYPAL_SECRET, PAYPAL_API } = process.env

const auth = { user: PAYPAL_CLIENT, pass: PAYPAL_SECRET }


// midleware para cambiar el precio del producto
router.use('/get-payment', async (req, res, next) => {
    try {
        let change = body.purchase_units[0].amount
        let { currency_code, value, orderid } = req.body

        currency_code = "USD"

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

        //validaciones para orderid
        if (orderid === undefined) {
            return res.status(404).json(`No se especifico un orderid del cliente`)
        }

        let clientFound = await Cart.findAll({
            where: { id: orderid },
        })

        body.client = orderid
        next()

    } catch (error) {
        console.log(error)
        res.status(404).json("Ocurrio un problema inesperado, revise el id del carrito proporcionado, no se encontraron carritos con el ID")
    }
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
    },
    client: "",
}


const createPayment = (req, res) => {
    body;
    request.post(`${PAYPAL_API}/v2/checkout/orders`, {
        auth,
        body,
        json: true
    }, async (err, response) => {
        let web = await response.body.links[1].href
        //res.json({ data: response.body })
        res.json(web)
    })
}


const executePayment = async (req, res) => {
    try {
        body;
        const token = req.query.token
        console.log("el executor saco dinero")
        request.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {
            auth,
            body: {},
            json: true
        }, async (err, response) => {

            let ticket = response.body.purchase_units[0].payments.captures[0]
            let status = "PENDING"
            if (ticket.status === "COMPLETED") { status = "SUCCESS" }

            const newTicket = {
                payment_method: "PAYPAL",
                operationCode: ticket.id,
                paymentStatus: status,
            }
            console.log("ticket:", newTicket)

            let userID = await Cart.findOne({
                where: { id: body.client },
                attributes: ['userId']
            })

            let code = userID.dataValues.userId;

            let userDate = await User.findOne({
                where: { id: code },
                attributes: ['name', 'mail']
            })

            let name = userDate.dataValues.name;
            let mail = userDate.dataValues.mail;

            await Cart.update({
                payment_method: "PAYPAL",
                paymentStatus: status,
                operationCode: newTicket.operationCode,
            }, {
                where: { id: body.client }
            })

            request.post('http://localhost:3001/mail', { form: { name: name, email: mail, message: msg.Psuccess1 + body.client + msg.Psuccess2 } }, async (err, response) => {

            })

            res.json(`El proceso de pago se efectuo de manera satisfactoria, ya puedes cerrar esta ventana`)
        })
    } catch (error) {
        console.log(error)
        res.status(404).json("Ocurrio un problema inesperado al intentar ejecutar el pago")
    }
}



router.post('/get-payment', createPayment)

router.get('/validated-payment', executePayment)

//ruta provisoria, deberia ser del front
router.get('/canceled-payment', async (req, res) => {
    body;
    const token = req.query.token

    const newTicket = {
        payment_method: "PAYPAL",
        operationCode: token,
        paymentStatus: "FAILURE",
    }
    console.log(newTicket)

    let userID = await Cart.findOne({
        where: { id: body.client },
        attributes: ['userId']
    })

    let code = userID.dataValues.userId;

    let userDate = await User.findOne({
        where: { id: code },
        attributes: ['name', 'mail']
    })

    let name = userDate.dataValues.name;
    let mail = userDate.dataValues.mail;

    await Cart.update({
        payment_method: "PAYPAL",
        paymentStatus: "FAILURE",
        operationCode: token,
    }, {
        where: { id: body.client }
    })

    request.post('http://localhost:3001/mail', { form: { name: name, email: mail, message: msg.Pfailure1 + body.client + msg.Pfailure2 } }, async (err, response) => {

    })


    let cancel = {
        msg: `El pago ${token} no pudo llevarse a cabo.
    Por uno de los siguientes motivos:
    *El cliente cancelo la compra
    *Las credenciales no son las correctas, reviselas
    *Intente cambiar de metodo de pago e intente nuevamente
    
    Puedes cerrar esta ventana`}
    return res.status(200).json(cancel)
})

module.exports = router;