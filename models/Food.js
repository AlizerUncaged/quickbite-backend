
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Food = sequelize.define('Food', {
        id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
        },
        name: {
                type: DataTypes.STRING,
                allowNull: false
        },
        description: {
                type: DataTypes.TEXT,
                allowNull: true
        },
        price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
        },
        image: {
                type: DataTypes.STRING,
                allowNull: true
        },
        category: {
                type: DataTypes.STRING,
                allowNull: false
        },
        restaurant: {
                type: DataTypes.STRING,
                allowNull: false
        },
        rating: {
                type: DataTypes.DECIMAL(2, 1),
                allowNull: true,
                validate: {
                        min: 0,
                        max: 5
                }
        },
        isAvailable: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
        }
}, {
        timestamps: true,
        tableName: 'foods'
});
module.exports = {
        Food,
};