const { DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        required: true,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        required: true,
      }
    }, {
      instanceMethods: {
          generateHash(password) {
              return bcrypt.hash(password, bcrypt.genSaltSync(10));
          },
          validPassword(password) {
              return bcrypt.compare(password, this.password);
          }
      }
    }
  )
}

