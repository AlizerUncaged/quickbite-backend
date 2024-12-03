
'use strict';

module.exports = {
        up: async (queryInterface, Sequelize) => {
                await queryInterface.bulkInsert('cart_items', [
                        {
                                cartId: 1,
                                foodId: 1,
                                quantity: 1,
                                price: 12.99,
                                subtotal: 12.99,
                                createdAt: new Date(),
                                updatedAt: new Date()
                        },
                        {
                                cartId: 1,
                                foodId: 2,
                                quantity: 1,
                                price: 15.99,
                                subtotal: 15.99,
                                createdAt: new Date(),
                                updatedAt: new Date()
                        },
                        {
                                cartId: 2,
                                foodId: 2,
                                quantity: 1,
                                price: 15.99,
                                subtotal: 15.99,
                                createdAt: new Date(),
                                updatedAt: new Date()
                        }
                ], {});
        },

        down: async (queryInterface, Sequelize) => {
                await queryInterface.bulkDelete('cart_items', null, {});
        }
};