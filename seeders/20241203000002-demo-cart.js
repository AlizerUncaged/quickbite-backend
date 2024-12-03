
'use strict';

module.exports = {
        up: async (queryInterface, Sequelize) => {
                await queryInterface.bulkInsert('carts', [
                        {
                                userId: 1,
                                deliveryType: 'delivery',
                                status: 'pending',
                                totalAmount: 28.98,
                                paymentMethod: 'card',
                                paymentStatus: 'pending',
                                change: 0.00,
                                deliveryAddress: '123 Main St, City, Country',
                                deliveryFee: 5.00,
                                specialInstructions: 'Please ring the doorbell',
                                createdAt: new Date(),
                                updatedAt: new Date()
                        },
                        {
                                userId: 2,
                                deliveryType: 'pickup',
                                status: 'completed',
                                totalAmount: 15.99,
                                paymentMethod: 'cash',
                                paymentStatus: 'paid',
                                change: 4.01,
                                deliveryAddress: null,
                                deliveryFee: 0.00,
                                specialInstructions: null,
                                createdAt: new Date(),
                                updatedAt: new Date()
                        }
                ], {});
        },

        down: async (queryInterface, Sequelize) => {
                await queryInterface.bulkDelete('carts', null, {});
        }
};