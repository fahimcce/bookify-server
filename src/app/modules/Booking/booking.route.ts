import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
import validateRequest from "../../middlewares/validRequest";
import { bookingValidation } from "./booking.validation";
import { bookingController } from "./booking.controller";

const router = Router();

router.post(
  "/bookings",
  auth(USER_ROLE.user),
  validateRequest(bookingValidation.bookingValidationSchema),
  bookingController.addBooking
);
router.get("/bookings", auth(USER_ROLE.admin), bookingController.getAllBooking);
router.get("/my-bookings", auth(USER_ROLE.user), bookingController.myBookings);
router.put(
  "/bookings/:id",
  auth(USER_ROLE.admin),
  validateRequest(bookingValidation.updateBookingValidationSchema),
  bookingController.udpateBooking
);
router.delete(
  "/bookings/:id",
  auth(USER_ROLE.admin),
  bookingController.deleteBooking
);

export const bookingsRouter = router;
