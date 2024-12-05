'use strict';

module.exports = {
        up: async (queryInterface, Sequelize) => {
                await queryInterface.addColumn('foods', 'quantity', {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                        defaultValue: 10,
                        validate: {
                                min: 0
                        }
                });
        },

        down: async (queryInterface, Sequelize) => {
                await queryInterface.removeColumn('foods', 'quantity');
        }
};