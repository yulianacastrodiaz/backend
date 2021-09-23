const { DataTypes } = require('sequelize')

module.exports = (sequelize => {
  sequelize.define('subCategory', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    type:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "La tipo no debe estar vacío"
        }
      }
    }
  });
})