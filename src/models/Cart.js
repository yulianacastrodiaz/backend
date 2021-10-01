const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define('cart', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    orderid: {
      type: DataTypes.INTEGER,
      primaryKey: false,
      autoIncrement: true
    },
    state: {
      type: DataTypes.ENUM("in process", "cancelled", "finished"),
      allowNull: false,
      defaultValue: "in process",
    },
    payment_method:{
      type: DataTypes.ENUM("STRIPE", "PAYPAL", "MERCADOPAGO"),
    },
    shipping:{
      type: DataTypes.STRING,
    },
    operationCode: {
      type: DataTypes.STRING,
    },
    paymentStatus:{
      type: DataTypes.ENUM("SUCCESS", "FAILURE", "PENDING"),
    } 
  })
} 