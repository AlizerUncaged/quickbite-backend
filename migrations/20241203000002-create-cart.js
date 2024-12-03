
'use strict';

module.exports = {
        up: async (queryInterface, Sequelize) => {
                await queryInterface.createTable('carts', {
                        id: {
                                type: Sequelize.INTEGER,
                                primaryKey: true,
                                autoIncrement: true
                        },
                        userId: {
                                type: Sequelize.INTEGER,
                                allowNull: false
                        },
                        deliveryType: {
                                type: Sequelize.ENUM('pickup', 'delivery'),
                                allowNull: false
                        },
                        status: {
                                type: Sequelize.ENUM('pending', 'processing', 'completed', 'cancelled'),
                                defaultValue: 'pending'
                        },
                        totalAmount: {
                                type: Sequelize.DECIMAL(10, 2),
                                allowNull: false,
                                defaultValue: 0.00
                        },
                        paymentMethod: {
                                type: Sequelize.ENUM('cash', 'card', 'digital_wallet'),
                                allowNull: false
                        },
                        paymentStatus: {
                                type: Sequelize.ENUM('pending', 'paid', 'failed'),
                                defaultValue: 'pending'
                        },
                        change: {
                                type: Sequelize.DECIMAL(10, 2),
                                allowNull: true,
                                defaultValue: 0.00
                        },
                        deliveryAddress: {
                                type: Sequelize.TEXT,
                                allowNull: true
                        },
                        deliveryFee: {
                                type: Sequelize.DECIMAL(10, 2),
                                allowNull: true,
                                defaultValue: 0.00
                        },
                        specialInstructions: {
                                type: Sequelize.TEXT,
                                allowNull: true
                        },
                        createdAt: {
                                type: Sequelize.DATE,
                                allowNull: false
                        },
                        updatedAt: {
                                type: Sequelize.DATE,
                                allowNull: false
                        }
                });
        },

        down: async (queryInterface, Sequelize) => {
                await queryInterface.dropTable('carts');
        }
};