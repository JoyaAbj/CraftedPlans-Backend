const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
  {
    image: {type: String, required: true },
    price: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    details: { type: String, required: true },
    category: { type: String, required: true },
  },
);

const Cars = mongoose.model("products", productsSchema);
module.exports = products;
