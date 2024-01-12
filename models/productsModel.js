const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
  {
    image: {type: Array, required: true },
    price: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    details: { type: String, required: true },
    category: { type: String, required: true },
  },
);

const products = mongoose.model("products", productsSchema);
module.exports = products;
