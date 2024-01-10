const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  products: [{ type: mongoose.Schema.Types.ObjectId,ref:'products'}],
  planners: [{ type: mongoose.Schema.Types.ObjectId,ref:'planners'}],
  status: { type: Boolean, default:false},
  address: {type: String, require: true }
},{ timestamps: true });

const Order = mongoose.model("order", orderSchema);
module.exports = Order;
