import mongoose from "mongoose";

const rooftopSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    pricePerHour: { type: Number, required: true },
    facilities: [{ type: String }],
    images: [{ type: String }],
    availability: [
      {
        date: { type: Date, required: true },
        slots: [{ start: String, end: String, booked: Boolean }],
      },
    ],
  },
  { timestamps: true }
);

const Rooftop = mongoose.model("Rooftop", rooftopSchema);

export default Rooftop;
  