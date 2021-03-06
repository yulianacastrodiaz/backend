require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE
} = process.env;

const sequelize = new Sequelize({
  database: DB_DATABASE,
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: 5432,
  dialect: "postgres",
  logging: false, // set to console.log to see the raw SQL queries
  native: false,
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { Category, SubCategory, Grape, Product, User, Review, Cart, Products_carts, Location, Wishlist, wlist_prods } = sequelize.models;


// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Product.hasMany(Review)
Review.belongsTo(Product)
Category.hasMany(SubCategory)
SubCategory.belongsTo(Category)
SubCategory.hasMany(Product)
Product.belongsTo(SubCategory)
Category.hasMany(Product)
Product.belongsTo(Category)
Grape.hasMany(Product)
Product.belongsTo(Grape)
User.hasMany(Review)
Review.belongsTo(User)
User.hasMany(Cart)
Cart.belongsTo(User)
Product.belongsToMany(Cart, { through: Products_carts })
Cart.belongsToMany(Product, { through: Products_carts })
User.hasOne(Wishlist);
Wishlist.belongsTo(User)
Product.belongsToMany(Wishlist, { through: 'wlist_prods' })
Wishlist.belongsToMany(Product, { through: 'wlist_prods' })

// User.hasMany(User) 
// Product.belongsTo(Location)
// Location.belongsToMany(Product)

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
