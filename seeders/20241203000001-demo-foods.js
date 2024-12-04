'use strict';

module.exports = {
     up: async (queryInterface, Sequelize) => {
          await queryInterface.bulkInsert('foods', [
               {
                    name: 'Classic Cheeseburger',
                    description: 'Juicy beef patty with melted cheese, fresh lettuce, tomatoes, and our special sauce',
                    price: 12.99,
                    image: 'https://www.foodrepublic.com/img/gallery/all-american-cheeseburger-recipe/intro-import.jpg',
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
                    image: 'https://static.toiimg.com/thumb/56868564.cms?width=1200&height=900',
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
                    image: 'https://www.kitchensanctuary.com/wp-content/uploads/2021/05/Double-Cheeseburger-square-FS-42.jpg',
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
                    image: 'https://atsloanestable.com/wp-content/uploads/2023/06/new-york-style-pizza2-500x500.jpg',
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