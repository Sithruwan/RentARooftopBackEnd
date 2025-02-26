import { Router } from "express";
import { validateBooking, validateBookingId } from "../midlewares/validations/bookingValidation.mjs";
import { jwtAuthverifyMiddleware } from "../midlewares/jwtAuthMiddleware.mjs";
import * as bookingController from "../controllers/booking.controller.mjs";
const bookingRouter = Router();

bookingRouter.post("/", jwtAuthverifyMiddleware, validateBooking, bookingController.createBooking);

// Get user bookings
bookingRouter.get("/user", jwtAuthverifyMiddleware, bookingController.getUserBookings);

// Get bookings for a specific rooftop
bookingRouter.get("/rooftop/:rooftopId", jwtAuthverifyMiddleware, bookingController.getRooftopBookings);

// Cancel a booking with validation
bookingRouter.delete("/:bookingId", jwtAuthverifyMiddleware, validateBookingId, bookingController.cancelBooking);

bookingRouter.get("/check-availability", jwtAuthverifyMiddleware, bookingController.checkAvailability);

export default bookingRouter;