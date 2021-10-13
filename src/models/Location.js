const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('location', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        show: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        change: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        adress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        coordsLat: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        coordsLng: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        center: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        zoom: {
            type: DataTypes.DECIMAL,
            defaultValue: 00,
        },
        year: {
            type: DataTypes.INTEGER,
            defaultValue: 00,
        },
        picture: {
            type: DataTypes.STRING,
            defaultValue: false,
        }
    });
};