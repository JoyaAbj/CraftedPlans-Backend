const mongoose = require("mongoose");

const templatesSchema = new mongoose.Schema(
  {
    image: {type: Array, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    name: {type: String, required: true}
  },
);

const Templates = mongoose.model("templates", templatesSchema);
module.exports = Templates;
