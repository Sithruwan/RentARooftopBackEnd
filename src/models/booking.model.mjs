import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  rooftop: { type: mongoose.Schema.Types.ObjectId, ref: "Rooftop", required: true }, // Linked rooftop
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Who booked it
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" }, // Booking status
  totalPrice: Number, // Based on time and rate
}, { timestamps: true });

// Prevent double-booking at the same time
bookingSchema.index({ rooftop: 1, startTime: 1, endTime: 1 }, { unique: true });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;