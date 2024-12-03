
const express = require('express');
const router = express.Router();
const { Cart, CartItem, Food } = require('../models');
const { Op } = require('sequelize');
const sequelize = require('../config/database');

// Get user's current cart
router.get('/user/:userId', async (req, res) => {
        try {
                const cart = await Cart.findOne({
                        where: {
                                userId: req.params.userId,
                                status: 'pending'
                        },
                        include: [{
                                model: CartItem,
                                include: [Food]
                        }]
                });
                res.json(cart);
        } catch (error) {
                res.status(500).json({ error: error.message });
        }
});

// Create new cart
router.post('/', async (req, res) => {
        try {
                const cart = await Cart.create(req.body);
                res.status(201).json(cart);
        } catch (error) {
                res.status(400).json({ error: error.message });
        }
});

// Update cart
router.put('/:id', async (req, res) => {
        try {
                const cart = await Cart.findByPk(req.params.id);
                if (!cart) {
                        return res.status(404).json({ error: 'Cart not found' });
                }
                await cart.update(req.body);
                res.json(cart);
        } catch (error) {
                res.status(400).json({ error: error.message });
        }
});

// Delete cart
router.delete('/:id', async (req, res) => {
        try {
                const cart = await Cart.findByPk(req.params.id);
                if (!cart) {
                        return res.status(404).json({ error: 'Cart not found' });
                }
                await cart.destroy();
                res.status(204).send();
        } catch (error) {
                res.status(500).json({ error: error.message });
        }
});

// Get cart history
router.get('/history/:userId', async (req, res) => {
        try {
                const carts = await Cart.findAll({
                        where: {
                                userId: req.params.userId,
                                status: ['completed', 'cancelled']
                        },
                        include: [{
                                model: CartItem,
                                include: [Food]
                        }],
                        order: [['createdAt', 'DESC']]
                });
                res.json(carts);
        } catch (error) {
                res.status(500).json({ error: error.message });
        }
});

// Update cart status
router.patch('/:id/status', async (req, res) => {
        try {
                const { status } = req.body;
                const cart = await Cart.findByPk(req.params.id);
                if (!cart) {
                        return res.status(404).json({ error: 'Cart not found' });
                }
                await cart.update({ status });
                res.json(cart);
        } catch (error) {
                res.status(400).json({ error: error.message });
        }
});

// Update payment status
router.patch('/:id/payment', async (req, res) => {
        try {
                const { paymentStatus } = req.body;
                const cart = await Cart.findByPk(req.params.id);
                if (!cart) {
                        return res.status(404).json({ error: 'Cart not found' });
                }
                await cart.update({ paymentStatus });
                res.json(cart);
        } catch (error) {
                res.status(400).json({ error: error.message });
        }
});

router.get('/search/:userId/:query', async (req, res) => {
        try {
                const carts = await Cart.findAll({
                        where: {
                                userId: req.params.userId,
                                [Op.or]: [
                                        { status: { [Op.like]: `%${req.params.query}%` } },
                                        { paymentMethod: { [Op.like]: `%${req.params.query}%` } },
                                        { deliveryAddress: { [Op.like]: `%${req.params.query}%` } },
                                        { specialInstructions: { [Op.like]: `%${req.params.query}%` } }
                                ]
                        },
                        include: [{
                                model: CartItem,
                                include: [Food]
                        }],
                        order: [['createdAt', 'DESC']]
                });
                res.json(carts);
        } catch (error) {
                res.status(500).json({ error: error.message });
        }
});



router.post('/with-items', async (req, res) => {
        try {
                const { userId, deliveryType, paymentMethod, deliveryAddress, specialInstructions, items } = req.body;

                // Start a transaction to ensure data consistency
                const result = await sequelize.transaction(async (t) => {
                        // Create the cart first
                        const cart = await Cart.create({
                                userId,
                                deliveryType,
                                paymentMethod,
                                deliveryAddress,
                                specialInstructions,
                                status: 'pending',
                                paymentStatus: 'pending'
                        }, { transaction: t });

                        // Calculate total amount and create cart items
                        let totalAmount = 0;
                        const cartItemPromises = [];

                        // Fetch all food items at once to avoid multiple queries
                        const foodIds = items.map(item => item.foodId);
                        const foods = await Food.findAll({
                                where: { id: foodIds },
                                transaction: t
                        });

                        // Create a map for quick food lookup
                        const foodMap = new Map(foods.map(food => [food.id, food]));

                        // Create cart items and calculate total
                        for (const item of items) {
                                const food = foodMap.get(item.foodId);

                                if (!food) {
                                        throw new Error(`Food item with id ${item.foodId} not found`);
                                }

                                const subtotal = food.price * item.quantity;
                                totalAmount += subtotal;

                                cartItemPromises.push(
                                        CartItem.create({
                                                cartId: cart.id,
                                                foodId: item.foodId,
                                                quantity: item.quantity,
                                                price: food.price,
                                                subtotal
                                        }, { transaction: t })
                                );
                        }

                        // Create all cart items in parallel
                        await Promise.all(cartItemPromises);

                        // Update cart with total amount
                        await cart.update({
                                totalAmount,
                                deliveryFee: deliveryType === 'delivery' ? 5.00 : 0.00 // Example delivery fee
                        }, { transaction: t });

                        // Return cart with items
                        return Cart.findByPk(cart.id, {
                                include: [{
                                        model: CartItem,
                                        include: [Food]
                                }],
                                transaction: t
                        });
                });

                res.status(201).json(result);
        } catch (error) {
                res.status(400).json({ error: error.message });
        }
});


module.exports = router;