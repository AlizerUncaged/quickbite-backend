
const Food = require('./Food');
const Cart = require('./Cart');
const CartItem = require('./CartItem');

// Define relationships
Cart.hasMany(CartItem, {
        foreignKey: 'cartId',
        onDelete: 'CASCADE'
});

CartItem.belongsTo(Cart, {
        foreignKey: 'cartId'
});

CartItem.belongsTo(Food, {
        foreignKey: 'foodId'
});

Food.hasMany(CartItem, {
        foreignKey: 'foodId'
});

module.exports = {
        Food,
        Cart,
        CartItem
};
