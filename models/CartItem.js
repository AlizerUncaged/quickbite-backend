
// models/CartItem.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CartItem = sequelize.define('CartItem', {
        id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
        },
        cartId: {
                type: DataTypes.INTEGER,
                allowNull: false
        },
        foodId: {
                type: DataTypes.INTEGER,
                allowNull: false
        },
        quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,
                validate: {
                        min: 1
                }
        },
        price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
        },
        subtotal: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
        }
}, {
        timestamps: true,
        tableName: 'cart_items'
});

module.exports = CartItem;