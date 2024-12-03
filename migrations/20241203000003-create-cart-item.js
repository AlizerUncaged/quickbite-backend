
'use strict';

module.exports = {
        up: async (queryInterface, Sequelize) => {
                await queryInterface.createTable('cart_items', {
                        id: {
                                type: Sequelize.INTEGER,
                                primaryKey: true,
                                autoIncrement: true
                        },
                        cartId: {
                                type: Sequelize.INTEGER,
                                allowNull: false,
                                references: {
                                        model: 'carts',
                                        key: 'id'
                                },
                                onDelete: 'CASCADE'
                        },
                        foodId: {
                                type: Sequelize.INTEGER,
                                allowNull: false,
                                references: {
                                        model: 'foods',
                                        key: 'id'
                                }
                        },
                        quantity: {
                                type: Sequelize.INTEGER,
                                allowNull: false,
                                defaultValue: 1
                        },
                        price: {
                                type: Sequelize.DECIMAL(10, 2),
                                allowNull: false
                        },
                        subtotal: {
                                type: Sequelize.DECIMAL(10, 2),
                                allowNull: false
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
                await queryInterface.dropTable('cart_items');
        }
};