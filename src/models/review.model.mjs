import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    rooftop: { type: mongoose.Schema.Types.ObjectId, ref: "Rooftop", required: true }, 
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    rating: { type: Number, min: 1, max: 5, required: true }, 
    comment: String, 
    createdAt: { type: Date, default: Date.now }
  });

const Review = mongoose.model("Review", reviewSchema);

export default Review;