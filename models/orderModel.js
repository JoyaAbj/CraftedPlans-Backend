const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  products: [{ type: mongoose.Schema.Types.ObjectId,ref:'products'}],
  planners: [{
    cover: { type: mongoose.Schema.Types.ObjectId, ref: "templates", required: true },
    personalInformation: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: Number, required: true },
      message: { type: String, required: true },
    },
    events: [{
      eventName: { type: String, required: true },
      date: { type: Date, required: true }
    }],
    price: { type: Number, required: true },
    pages: { type: mongoose.Schema.Types.ObjectId, ref: "templates", required: true },
    addOns: [{ type: mongoose.Schema.Types.ObjectId, ref: "templates", required: true }],
  }],
  status: { type: Boolean, default:false},
  address: {type: String, require: true }
},{ timestamps: true });

const Order = mongoose.model("order", orderSchema);
module.exports = Order;
