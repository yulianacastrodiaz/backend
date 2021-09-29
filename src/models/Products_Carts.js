const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  sequelize.define('products_carts', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  })
}