
// models/Cart.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cart = sequelize.define('Cart', {
        id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
        },
        userId: {
                type: DataTypes.INTEGER,
                allowNull: false
        },
        deliveryType: {
                type: DataTypes.ENUM('pickup', 'delivery'),
                allowNull: false
        },
        status: {
                type: DataTypes.ENUM('pending', 'processing', 'completed', 'cancelled'),
                defaultValue: 'pending'
        },
        totalAmount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                defaultValue: 0.00
        },
        paymentMethod: {
                type: DataTypes.ENUM('cash', 'card', 'digital_wallet'),
                allowNull: false
        },
        paymentStatus: {
                type: DataTypes.ENUM('pending', 'paid', 'failed'),
                defaultValue: 'pending'
        },
        change: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
                defaultValue: 0.00
        },
        deliveryAddress: {
                type: DataTypes.TEXT,
                allowNull: true
        },
        deliveryFee: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
                defaultValue: 0.00
        },
        specialInstructions: {
                type: DataTypes.TEXT,
                allowNull: true
        }
}, {
        timestamps: true,
        tableName: 'carts'
});

module.exports = Cart;