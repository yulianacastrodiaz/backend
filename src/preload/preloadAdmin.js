const { User } = require('../db');
const bcrypt = require('bcrypt');
const authConfig = require('../config/auth')

async function preloadAdmin(){
  try {
    const password = "123456789"
    let passwordHashed = bcrypt.hashSync(password, parseInt(authConfig.rounds))
    const newadmin = await User.create({
      mail: "admin@admin.com",
      username: "Admin28",
      name: "Admin",
      lastname: "Pollito",
      password: passwordHashed,
      isAdmin: true,
    }) 
  } catch (error) {
    return console.log(error)
  }
}

module.exports = preloadAdmin;