
const express = require('express');
const router = express.Router();
const { Cart, CartItem, Food } = require('../models');

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

module.exports = router;