import Booking from "../models/booking.model.mjs";

export const createBooking = async (bookingData) => {
    return await Booking.create(bookingData);
};

export const getBookingsByUser = async (userId) => {
    return await Booking.find({ user: userId }).populate("rooftop");
};

export const getBookingsByRooftop = async (rooftopId) => {
    return await Booking.find({ rooftop: rooftopId }).populate("user");
};

export const checkAvailability = async (rooftopId, startTime, endTime) => {
    return await Booking.findOne({
        rooftop: rooftopId,
        $or: [
            { startTime: { $lt: endTime }, endTime: { $gt: startTime } }, // Overlapping bookings
        ],
    });
};

export const cancelBooking = async (bookingId) => {
    return await Booking.findByIdAndUpdate(bookingId, { status: "cancelled" }, { new: true });
};

// Find bookings for a rooftop within a time range
export const findBookingsByRooftopAndTimeRange = async (rooftopId, startTime, endTime) => {
    // Convert string dates to Date objects if they aren't already
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    return await Booking.find({
      rooftop: rooftopId,
      status: { $in: ["confirmed", "pending"] },
      $or: [
        // Booking overlaps with requested time
        { 
          startTime: { $lt: end }, 
          endTime: { $gt: start } 
        }
      ]
    });
  };