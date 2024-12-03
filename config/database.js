
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('quickbite', 'root', 'abC898909?', {
        host: 'localhost',
        dialect: 'mysql',
        logging: false, // Set to console.log to see SQL queries
        pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
        }
});

module.exports = sequelize;