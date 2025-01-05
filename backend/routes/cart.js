const express = require('express');
const router = express.Router();
const ShoppingCart = require('../models/ShoppingCart');
const authenticated = require('../middlewares/authenticated');

router.use(authenticated);

router.get('/', async (req, res) => {
    try {
        const userId = req.user ? req.user.id : error
        const cartItems = await ShoppingCart.find({ userId }).populate('productId');
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user ? req.user.id : error
        const cartItem = new ShoppingCart({ productId, userId });
        await cartItem.save();
        res.status(201).send(cartItem);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await ShoppingCart.deleteOne({ _id: id });
        res.status(200).send({ message: 'Пост удален из корзины' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.delete('/', async (req, res) => {
    try {
        const userId = req.user ? req.user.id : error;
        await ShoppingCart.deleteMany({ userId });
        res.status(200).send({ message: 'Корзина очищена' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router; 