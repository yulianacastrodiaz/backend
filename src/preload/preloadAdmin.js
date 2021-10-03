const { User } = require('../db');
const bcrypt = require('bcrypt');
const authConfig = require('../config/auth')

async function preloadAdmin(){
  try {
    const password = "123456789"
    let passwordHashed = bcrypt.hashSync(password, parseInt(authConfig.rounds))
    const newadmin = await User.create({
      mail: "yulianacastrodiaz7@gmail.com",
      username: "Yuliana28",
      name: "Yuliana",
      lastname: "Castro",
      password: passwordHashed,
      isAdmin: true,
    }) 
  } catch (error) {
    return console.log(error)
  }
}

module.exports = preloadAdmin;