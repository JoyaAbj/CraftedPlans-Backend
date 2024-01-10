const mongoose = require("mongoose");

const templatesSchema = new mongoose.Schema(
  {
    image: {type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
  },
);

const Cars = mongoose.model("templates", templatesSchema);
module.exports = templates;
