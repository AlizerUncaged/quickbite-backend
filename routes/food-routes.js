
const express = require('express');
const router = express.Router();
const { Food } = require('../models');

// Get all foods
router.get('/', async (req, res) => {
        try {
                const foods = await Food.findAll({
                        where: req.query.category ? { category: req.query.category } : {},
                        order: [['name', 'ASC']]
                });
                res.json(foods);
        } catch (error) {
                res.status(500).json({ error: error.message });
        }
});

// Get food by ID
router.get('/:id', async (req, res) => {
        try {
                const food = await Food.findByPk(req.params.id);
                if (!food) {
                        return res.status(404).json({ error: 'Food not found' });
                }
                res.json(food);
        } catch (error) {
                res.status(500).json({ error: error.message });
        }
});

// Create new food
router.post('/', async (req, res) => {
        try {
                const food = await Food.create(req.body);
                res.status(201).json(food);
        } catch (error) {
                res.status(400).json({ error: error.message });
        }
});

// Update food
router.put('/:id', async (req, res) => {
        try {
                const food = await Food.findByPk(req.params.id);
                if (!food) {
                        return res.status(404).json({ error: 'Food not found' });
                }
                await food.update(req.body);
                res.json(food);
        } catch (error) {
                res.status(400).json({ error: error.message });
        }
});

// Delete food
router.delete('/:id', async (req, res) => {
        try {
                const food = await Food.findByPk(req.params.id);
                if (!food) {
                        return res.status(404).json({ error: 'Food not found' });
                }
                await food.destroy();
                res.status(204).send();
        } catch (error) {
                res.status(500).json({ error: error.message });
        }
});

// Search foods
router.get('/search/:query', async (req, res) => {
        try {
                const foods = await Food.findAll({
                        where: {
                                [Op.or]: [
                                        { name: { [Op.like]: `%${req.params.query}%` } },
                                        { description: { [Op.like]: `%${req.params.query}%` } }
                                ]
                        }
                });
                res.json(foods);
        } catch (error) {
                res.status(500).json({ error: error.message });
        }
});

// Get foods by restaurant
router.get('/restaurant/:restaurant', async (req, res) => {
        try {
                const foods = await Food.findAll({
                        where: { restaurant: req.params.restaurant }
                });
                res.json(foods);
        } catch (error) {
                res.status(500).json({ error: error.message });
        }
});

module.exports = router;