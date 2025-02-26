import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    rooftop: { type: mongoose.Schema.Types.ObjectId, ref: "Rooftop", required: true }, // Linked rooftop
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Who booked it
    startTime: Date, // Booking start time
    endTime: Date, // Booking end time
    status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" }, // Booking status
    totalPrice: Number, // Based on time and rate
  });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;