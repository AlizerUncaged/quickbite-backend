
'use strict';

module.exports = {
        up: async (queryInterface, Sequelize) => {
                await queryInterface.bulkInsert('foods', [
                        {
                                name: 'Classic Cheeseburger',
                                description: 'Juicy beef patty with melted cheese, fresh lettuce, tomatoes, and our special sauce',
                                price: 12.99,
                                image: '../assets/burger.png',
                                category: 'Burgers',
                                restaurant: 'Burger House',
                                rating: 4.8,
                                isAvailable: true,
                                createdAt: new Date(),
                                updatedAt: new Date()
                        },
                        {
                                name: 'Margherita Pizza',
                                description: 'Traditional Italian pizza with fresh tomatoes, mozzarella, basil, and olive oil',
                                price: 15.99,
                                image: '../assets/pizza.png',
                                category: 'Pizza',
                                restaurant: 'Pizza Palace',
                                rating: 4.6,
                                isAvailable: true,
                                createdAt: new Date(),
                                updatedAt: new Date()
                        },
                        {
                                name: 'Double Cheese Burger',
                                description: 'Double beef patty with extra cheese, bacon, and caramelized onions',
                                price: 16.99,
                                image: '../assets/burger.png',
                                category: 'Burgers',
                                restaurant: 'Burger House',
                                rating: 4.7,
                                isAvailable: true,
                                createdAt: new Date(),
                                updatedAt: new Date()
                        },
                        {
                                name: 'Pepperoni Pizza',
                                description: 'Classic pizza topped with spicy pepperoni and melted mozzarella',
                                price: 17.99,
                                image: '../assets/pizza.png',
                                category: 'Pizza',
                                restaurant: 'Pizza Palace',
                                rating: 4.5,
                                isAvailable: true,
                                createdAt: new Date(),
                                updatedAt: new Date()
                        }
                ], {});
        },

        down: async (queryInterface, Sequelize) => {
                await queryInterface.bulkDelete('foods', null, {});
        }
};