const express = require('express');
const router = express.Router();
const { CartItem, Food, Cart } = require('../models');
const sequelize = require('../config/database');

// Add item to cart with inventory check
router.post('/', async (req, res) => {
        const t = await sequelize.transaction();

        try {
                const { cartId, foodId, quantity } = req.body;

                // Get food with inventory check
                const food = await Food.findByPk(foodId, { transaction: t });
                if (!food) {
                        await t.rollback();
                        return res.status(404).json({ error: 'Food not found' });
                }

                // Check if there's enough quantity available
                if (food.quantity < quantity) {
                        await t.rollback();
                        return res.status(400).json({
                                error: 'Not enough quantity available',
                                availableQuantity: food.quantity
                        });
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
                }, { transaction: t });

                // Update food quantity
                await food.update({
                        quantity: food.quantity - quantity
                }, { transaction: t });

                // Update cart total
                const cart = await Cart.findByPk(cartId, { transaction: t });
                await cart.update({
                        totalAmount: parseInt(cart.totalAmount) + subtotal
                }, { transaction: t });

                await t.commit();

                // Return cart item with food details
                const itemWithDetails = await CartItem.findByPk(cartItem.id, {
                        include: [Food]
                });

                res.status(201).json(itemWithDetails);
        } catch (error) {
                await t.rollback();
                res.status(400).json({ error: error.message });
        }
});

// Update cart item quantity with inventory check
router.put('/:id', async (req, res) => {
        const t = await sequelize.transaction();

        try {
                const { quantity } = req.body;
                const cartItem = await CartItem.findByPk(req.params.id, {
                        include: [Food],
                        transaction: t
                });

                if (!cartItem) {
                        await t.rollback();
                        return res.status(404).json({ error: 'Cart item not found' });
                }

                const food = await Food.findByPk(cartItem.foodId, { transaction: t });
                const quantityDifference = quantity - cartItem.quantity;

                // Check if there's enough quantity available for an increase
                if (quantityDifference > 0 && food.quantity < quantityDifference) {
                        await t.rollback();
                        return res.status(400).json({
                                error: 'Not enough quantity available',
                                availableQuantity: food.quantity
                        });
                }

                // Calculate old and new subtotals
                const oldSubtotal = cartItem.subtotal;
                const newSubtotal = cartItem.price * quantity;
                const difference = newSubtotal - oldSubtotal;

                // Update cart item
                await cartItem.update({
                        quantity,
                        subtotal: newSubtotal
                }, { transaction: t });

                // Update food quantity
                await food.update({
                        quantity: food.quantity - quantityDifference
                }, { transaction: t });

                // Update cart total
                const cart = await Cart.findByPk(cartItem.cartId, { transaction: t });
                await cart.update({
                        totalAmount: cart.totalAmount + difference
                }, { transaction: t });

                await t.commit();
                res.json(cartItem);
        } catch (error) {
                await t.rollback();
                res.status(400).json({ error: error.message });
        }
});

// Remove item from cart and return quantity to inventory
router.delete('/:id', async (req, res) => {
        const t = await sequelize.transaction();

        try {
                const cartItem = await CartItem.findByPk(req.params.id, { transaction: t });
                if (!cartItem) {
                        await t.rollback();
                        return res.status(404).json({ error: 'Cart item not found' });
                }

                // Return quantity to inventory
                const food = await Food.findByPk(cartItem.foodId, { transaction: t });
                await food.update({
                        quantity: food.quantity + cartItem.quantity
                }, { transaction: t });

                // Update cart total
                const cart = await Cart.findByPk(cartItem.cartId, { transaction: t });
                await cart.update({
                        totalAmount: cart.totalAmount - cartItem.subtotal
                }, { transaction: t });

                // Delete cart item
                await cartItem.destroy({ transaction: t });

                await t.commit();
                res.status(204).send();
        } catch (error) {
                await t.rollback();
                res.status(500).json({ error: error.message });
        }
});

module.exports = router;