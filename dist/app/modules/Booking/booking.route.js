"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingsRouter = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middileWare/validateRequest"));
const booking_validation_1 = require("./booking.validation");
const booking_controller_1 = require("./booking.controller");
const authGuared_1 = __importDefault(require("../../middileWare/authGuared"));
const user_constant_1 = require("../User/user.constant");
const router = (0, express_1.Router)();
router.post("/confirm-payment", booking_controller_1.bookingController.confirmPayment);
router.post("/bookings", (0, validateRequest_1.default)(booking_validation_1.bookingValidation.bookingValidationSchema), booking_controller_1.bookingController.addBooking);
router.get("/bookings", (0, authGuared_1.default)(user_constant_1.USER_ROLE.admin), booking_controller_1.bookingController.getAllBooking);
router.get("/my-bookings", (0, authGuared_1.default)(user_constant_1.USER_ROLE.user), booking_controller_1.bookingController.myBookings);
router.put("/confirm-booking/:id", (0, authGuared_1.default)(user_constant_1.USER_ROLE.admin), booking_controller_1.bookingController.conFirmBookingByAdmin);
// router.put(
//   "/bookings/:id",
//   authGuared(USER_ROLE.admin),
//   validateRequest(bookingValidation.updateBookingValidationSchema),
//   bookingController.udpateBooking
// );
router.delete("/bookings/:id", booking_controller_1.bookingController.deleteBooking);
exports.bookingsRouter = router;
