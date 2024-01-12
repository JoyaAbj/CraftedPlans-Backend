const { timeStamp } = require("console");
const mongoose = require("mongoose");

const plannersSchema = new mongoose.Schema(
  {
    cover: { type: String, required: true },
    personalInformation: { type: String, required: true },
    events: { type: String, required: true },
    price: { type: Number, required: true },
    pages: { type: String, required: true },
    addOns: { type: String, required: true },
  },
  { timestamps: true }
);

const Planners = mongoose.model("planners", plannersSchema);
module.exports = Planners;
