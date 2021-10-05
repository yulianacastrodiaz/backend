const { Router } = require('express');
const nodemailer = require('nodemailer')
const { google } = require('googleapis')
require('dotenv').config();
const router = Router();
const { G_CLIENT_ID, G_CLIENT_SECRET, G_REDIRECT_URI, G_REFRESH_TOKEN } = process.env

router.post('/', async (req,res) => {
    const {name, email, subject, message} = req.body;
    const contentHtml = `
        <h1>Wines e-commerce</h1>
        <ul>
            <li>name: ${name}</li>
            <li>email: ${email}</li>
        </ul>
        <p>${message}</p>
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
    oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN})
    
    async function sendMail() {
        try{
          const accessToken = await oAuth2Client.getAccessToken()
          const transporter = nodemailer.createTransport({
            service:'gmail',
            auth: {
                type: 'OAuth2',
                user: 'apimailstk@gmail.com',
                clientId:CLIENT_ID,
                clientSecret:CLIENT_SECRET,
                refreshToken:REFRESH_TOKEN,
                accessToken: accessToken
            }
          })
          const mailOptions= {
              from:'Wine-ecommerce <apimailstk@gmail>',
              to: `${email}`,
              subject: subject,
              html:contentHtml
          } 
          
          const result = await transporter.sendMail(mailOptions)
          return result;
        } catch(err) {
            console.log('Error snding email: ', err);
        }
    }

    sendMail()
      .then(result => res.status(200).send('email sent'))
      .catch(error => console.log(error.message))
})
module.exports = router;