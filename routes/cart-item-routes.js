
const express = require('express');
const router = express.Router();
const { CartItem, Food, Cart } = require('../models');

// Add item to cart
router.post('/', async (req, res) => {
        try {
                const { cartId, foodId, quantity } = req.body;

                // Get food price
                const food = await Food.findByPk(foodId);
                if (!food) {
                        return res.status(404).json({ error: 'Food not found' });
                }

                // Calculate subtotal
                const subtotal = food.price * quantity;

                // Create cart item
                const cartItem = await CartItem.create({
                        cartId,
                        foodId,
                        quantity,
                        price: food.price,
                        subtotal
                });

                // Update cart total
                const cart = await Cart.findByPk(cartId);
                await cart.update({
                        totalAmount: cart.totalAmount + subtotal
                });

                // Return cart item with food details
                const itemWithDetails = await CartItem.findByPk(cartItem.id, {
                        include: [Food]
                });

                res.status(201).json(itemWithDetails);
        } catch (error) {
                res.status(400).json({ error: error.message });
        }
});

// Update cart item quantity
router.put('/:id', async (req, res) => {
        try {
                const { quantity } = req.body;
                const cartItem = await CartItem.findByPk(req.params.id, {
                        include: [Food]
                });

                if (!cartItem) {
                        return res.status(404).json({ error: 'Cart item not found' });
                }

                // Calculate old and new subtotals
                const oldSubtotal = cartItem.subtotal;
                const newSubtotal = cartItem.price * quantity;
                const difference = newSubtotal - oldSubtotal;

                // Update cart item
                await cartItem.update({
                        quantity,
                        subtotal: newSubtotal
                });

                // Update cart total
                const cart = await Cart.findByPk(cartItem.cartId);
                await cart.update({
                        totalAmount: cart.totalAmount + difference
                });

                res.json(cartItem);
        } catch (error) {
                res.status(400).json({ error: error.message });
        }
});

// Remove item from cart
router.delete('/:id', async (req, res) => {
        try {
                const cartItem = await CartItem.findByPk(req.params.id);
                if (!cartItem) {
                        return res.status(404).json({ error: 'Cart item not found' });
                }

                // Update cart total
                const cart = await Cart.findByPk(cartItem.cartId);
                await cart.update({
                        totalAmount: cart.totalAmount - cartItem.subtotal
                });

                // Delete cart item
                await cartItem.destroy();
                res.status(204).send();
        } catch (error) {
                res.status(500).json({ error: error.message });
        }
});

// Get all items in a cart
router.get('/cart/:cartId', async (req, res) => {
        try {
                const cartItems = await CartItem.findAll({
                        where: { cartId: req.params.cartId },
                        include: [Food],
                        order: [['createdAt', 'DESC']]
                });
                res.json(cartItems);
        } catch (error) {
                res.status(500).json({ error: error.message });
        }
});

module.exports = router;