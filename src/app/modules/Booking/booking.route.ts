import { Router } from "express";
import validateRequest from "../../middileWare/validateRequest";
import { bookingValidation } from "./booking.validation";
import { bookingController } from "./booking.controller";
import authGuared from "../../middileWare/authGuared";
import { USER_ROLE } from "../User/user.constant";

const router = Router();

router.post("/confirm-payment", bookingController.confirmPayment);
router.post("/bookings", validateRequest(bookingValidation.bookingValidationSchema), bookingController.addBooking);

router.get("/bookings", authGuared(USER_ROLE.admin), bookingController.getAllBooking);

router.get("/my-bookings", authGuared(USER_ROLE.user), bookingController.myBookings);

router.put("/confirm-booking/:id", authGuared(USER_ROLE.admin), bookingController.conFirmBookingByAdmin);

// router.put(
//   "/bookings/:id",
//   authGuared(USER_ROLE.admin),
//   validateRequest(bookingValidation.updateBookingValidationSchema),
//   bookingController.udpateBooking
// );
router.delete("/bookings/:id", bookingController.deleteBooking);

export const bookingsRouter = router;
