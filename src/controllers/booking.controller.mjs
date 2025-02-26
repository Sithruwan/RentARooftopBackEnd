import * as bookingService from '../services/booking.service.mjs';

export const createBooking = async (req, res) => {
    try {
        const { rooftopId, startTime, endTime } = req.body;
        const userId = req.user.id;

        if (!rooftopId || !startTime || !endTime) {
            return res.status(400).json({ msg: "Missing required fields." });
        }

        const booking = await bookingService.createBooking(userId, rooftopId, new Date(startTime), new Date(endTime));

        res.status(201).json({ msg: "Booking created successfully.", booking });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const getUserBookings = async (req, res) => {
    try {
        const userId = req.user.id;
        const bookings = await bookingService.getUserBookings(userId);
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ msg: "Error retrieving bookings." });
    }
};

export const getRooftopBookings = async (req, res) => {
    try {
        const { rooftopId } = req.params;
        const bookings = await bookingService.getRooftopBookings(rooftopId);
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ msg: "Error retrieving bookings." });
    }
};

export const cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const booking = await bookingService.cancelBooking(bookingId);
        res.json({ msg: "Booking cancelled.", booking });
    } catch (error) {
        res.status(500).json({ msg: "Error cancelling booking." });
    }
};

export const checkAvailability = async (req, res) => {
    const { rooftopId, startTime, endTime } = req.query;
  
    try {
      const availability = await bookingService.checkRooftopAvailability(rooftopId, new Date(startTime), new Date(endTime));
      return res.status(200).json(availability);
    } catch (error) {
      return res.status(500).json({
        msg: "Error checking rooftop availability.",
        error: error.message
      });
    }
  };
