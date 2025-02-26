import { body, param, validationResult } from "express-validator";
import mongoose from "mongoose";

const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

const validateBooking = [
  body("rooftopId")
    .notEmpty().withMessage("Rooftop ID is required.")
    .custom((value) => isValidObjectId(value)).withMessage("Invalid Rooftop ID format."),

  body("startTime")
    .notEmpty().withMessage("Start time is required.")
    .isISO8601().withMessage("Invalid date format. Use ISO 8601 format.")
    .custom((value) => new Date(value) > new Date()).withMessage("Start time cannot be in the past."),

  body("endTime")
    .notEmpty().withMessage("End time is required.")
    .isISO8601().withMessage("Invalid date format. Use ISO 8601 format.")
    .custom((value, { req }) => new Date(value) > new Date(req.body.startTime))
    .withMessage("End time must be after start time."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateBookingId = [
  param("bookingId")
    .custom((value) => isValidObjectId(value)).withMessage("Invalid Booking ID format."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export { validateBooking, validateBookingId };
