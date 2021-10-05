const { Router } = require('express');
const nodemailer = require('nodemailer')
const { google } = require('googleapis')
require('dotenv').config();
const router = Router();
const { G_CLIENT_ID, G_CLIENT_SECRET, G_REDIRECT_URI, G_REFRESH_TOKEN } = process.env

router.post('/', async (req, res) => {

    let { name, email, message, subject } = req.body;
    if (!subject) { subject = 'Info desde Wines e-commerce' }
    const contentHtml = `
        <h1>Ewines</h1>
        <h2> Hola ${name} !</h2>
        <p>${message}</p>
        <h6><p>POLÍTICA DE PRIVACIDAD: \nEn virtud de lo establecido por la disposición de Protección de Datos Personales usted tiene derecho a solicitar al emisor de este mensaje la rectificación, actualización, inclusión o supresión de los datos personales incluidos en su base de contactos, listas o cadenas de mensajes en los cuales usted se encuentre.\n Si no querés recibir más nuestros e-mails hacé click acá. \n Las presentes disposiciones generales serán aplicables y regirán para poder operar en el sitio y/o bien, hacer uso de los servicios que se ofrecen en eWines.</p></h6>
    `;

    const CLIENT_ID = G_CLIENT_ID;
    const CLIENT_SECRET = G_CLIENT_SECRET;
    const REDIRECT_URI = G_REDIRECT_URI;
    const REFRESH_TOKEN = G_REFRESH_TOKEN;

    const oAuth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
    )
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

    async function sendMail() {
        try {
            const accessToken = await oAuth2Client.getAccessToken()
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: 'apimailstk@gmail.com',
                    clientId: CLIENT_ID,
                    clientSecret: CLIENT_SECRET,
                    refreshToken: REFRESH_TOKEN,
                    accessToken: accessToken
                }
            })
            const mailOptions = {
                from: 'Wine-ecommerce <apimailstk@gmail>',
                to: `${email}`,
                subject: subject,
                html: contentHtml
            }

            const result = await transporter.sendMail(mailOptions)
            return result;
        } catch (err) {
            console.log('Error snding email: ', err);
        }
    }

    sendMail()
        .then(result => res.status(200).send('email sent'))
        .catch(error => console.log(error.message))
})
module.exports = router;