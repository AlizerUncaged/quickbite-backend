
// migrations/20241203000001-create-food.js
'use strict';

module.exports = {
        up: async (queryInterface, Sequelize) => {
                await queryInterface.createTable('foods', {
                        id: {
                                type: Sequelize.INTEGER,
                                primaryKey: true,
                                autoIncrement: true
                        },
                        name: {
                                type: Sequelize.STRING,
                                allowNull: false
                        },
                        description: {
                                type: Sequelize.TEXT,
                                allowNull: true
                        },
                        price: {
                                type: Sequelize.DECIMAL(10, 2),
                                allowNull: false
                        },
                        image: {
                                type: Sequelize.STRING,
                                allowNull: true
                        },
                        category: {
                                type: Sequelize.STRING,
                                allowNull: false
                        },
                        restaurant: {
                                type: Sequelize.STRING,
                                allowNull: false
                        },
                        rating: {
                                type: Sequelize.DECIMAL(2, 1),
                                allowNull: true
                        },
                        isAvailable: {
                                type: Sequelize.BOOLEAN,
                                defaultValue: true
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
                await queryInterface.dropTable('foods');
        }
};
