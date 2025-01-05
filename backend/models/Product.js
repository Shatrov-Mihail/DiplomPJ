const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    additionalImages: [{
      type: String,
      required: false,
    }],
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
        type: Number,
        required: true,
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
