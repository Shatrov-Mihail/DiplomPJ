const mongoose = require('mongoose');

const shoppingCartSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    userId: { type: String, required: true }
});

module.exports = mongoose.model('ShoppingCart', shoppingCartSchema);
