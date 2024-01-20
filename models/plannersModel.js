const mongoose = require("mongoose");

const plannersSchema = new mongoose.Schema(
  {
    cover: {type: mongoose.Schema.Types.ObjectId, ref: "templates", required:true},
    personalInformation: {
      fullName: {type:String, required:true},
      email: {type:String, required:true},
      phone: {type:Number, required:true},
      message: {type:String, required:true},
  },
    events: [{
      eventName: {type: String, required:true},
      date: {type: Date, required:true}
    }],
    price: {type: Number, required:true},
    pages: {type: mongoose.Schema.Types.ObjectId, ref: "templates", required:true},
    addOns: [{type: mongoose.Schema.Types.ObjectId, ref: "templates", required:true}],
  },
);

const Planners = mongoose.model("planners", plannersSchema);
module.exports = Planners;
