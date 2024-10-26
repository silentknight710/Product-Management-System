const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST a new product
router.post('/', async (req, res) => {
    const { name, description, price, quantity } = req.body;
    try {
        const product = await Product.create({ name, description, price, quantity });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT update a product
router.put('/:id', async (req, res) => {
    try {
        const product = await Product.update(req.body, {
            where: { id: req.params.id },
            returning: true,
        });
        res.status(200).json(product[1][0]); // Return the updated product
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE a product
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Product.destroy({ where: { id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
