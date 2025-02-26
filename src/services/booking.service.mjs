import * as bookingRepo from '../repos/booking.repo.mjs';
import * as rooftopRepo from '../repos/rooftop.repo.mjs';

export const createBooking = async (userId, rooftopId, startTime, endTime) => {
    // Check if the rooftop is available for the requested time
    const existingBooking = await bookingRepo.checkAvailability(rooftopId, startTime, endTime);
    if (existingBooking) {
        throw new Error("Rooftop is already booked for the selected time slot.");
    }

    return await bookingRepo.createBooking({
        user: userId,
        rooftop: rooftopId,
        startTime,
        endTime,
    });
};

export const getUserBookings = async (userId) => {
    return await bookingRepo.getBookingsByUser(userId);
};

export const getRooftopBookings = async (rooftopId) => {
    return await bookingRepo.getBookingsByRooftop(rooftopId);
};

export const cancelBooking = async (bookingId) => {
    return await bookingRepo.cancelBooking(bookingId);
};

// Check if rooftop is available for a given time range
export const checkRooftopAvailability = async (rooftopId, startTime, endTime) => {
    try {
      // Check if the rooftop exists
      const rooftop = await rooftopRepo.findRooftopById(rooftopId);
  
      if (!rooftop) {
        return { available: false, message: "Rooftop not found." };
      }
      
      const bookings = await bookingRepo.findBookingsByRooftopAndTimeRange(rooftopId, startTime, endTime);
      
      if (bookings.length > 0) {
        return { available: false, message: "Rooftop is not available during this time." };
      }
  
      return { available: true, message: "Rooftop is available for booking." };
    } catch (error) {
      throw new Error("Error checking rooftop availability.");
    }
  };