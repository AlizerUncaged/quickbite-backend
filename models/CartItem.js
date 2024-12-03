
const CartItem = sequelize.define('CartItem', {
        id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
        },
        cartId: {
                type: DataTypes.INTEGER,
                allowNull: false
        },
        foodId: {
                type: DataTypes.INTEGER,
                allowNull: false
        },
        quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,
                validate: {
                        min: 1
                }
        },
        price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
        },
        subtotal: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
        }
}, {
        timestamps: true,
        tableName: 'cart_items'
});

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
        CartItem
};
