const mongoose = require('mongoose');

const shoppingCartSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    userId: { type: String, required: true }
});

module.exports = mongoose.model('ShoppingCart', shoppingCartSchema);
