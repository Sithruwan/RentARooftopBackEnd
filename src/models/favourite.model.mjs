import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    rooftops: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rooftop" }]
  });

const Favorite = mongoose.model("Favorite", favoriteSchema);

export default Favorite;