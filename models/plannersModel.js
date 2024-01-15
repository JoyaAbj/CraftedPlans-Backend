const { timeStamp } = require("console");
const mongoose = require("mongoose");

const plannersSchema = new mongoose.Schema(
  {
    cover: {type: mongoose.Schema.Types.ObjectId, ref: "templates", required:true},
    personalInformation: {type: mongoose.Schema.Types.ObjectId, ref: "templates", required:true},
    events: {type: mongoose.Schema.Types.ObjectId, ref: "templates", required:true},
    price: {type: mongoose.Schema.Types.ObjectId, ref: "templates", required:true},
    pages: {type: mongoose.Schema.Types.ObjectId, ref: "templates", required:true},
    addOns: {type: mongoose.Schema.Types.ObjectId, ref: "templates", required:true},
  },
  { timestamps: true }
);

const Planners = mongoose.model("planners", plannersSchema);
module.exports = Planners;
