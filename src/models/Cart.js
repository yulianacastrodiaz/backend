const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define('cart', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    state: {
      type: DataTypes.ENUM("in process", "cancelled", "finished"),
      allowNull: false,
      defaultValue: "in process",
    },
    payment_method:{
      type: DataTypes.STRING,
    },
    shipping:{
      type: DataTypes.STRING,
    }
  })
} 