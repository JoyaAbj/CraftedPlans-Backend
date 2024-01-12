const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userID: {type: mongoose.Schema.Types.ObjectId, ref: "user", required:true},
  comment:{type:String , required:true},
  rating:{type:Number, required:true}
},{ timestamps: true });

const Review = mongoose.model("reviews", reviewSchema);
module.exports = Review;