const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'A name is required.'], },
    description: { type: String, required: true, },
    img: { type: String, required: true },
    categories:  { type: String, required: true },
    stockQuantity: { type: String },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);