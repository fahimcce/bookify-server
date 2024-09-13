"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingsRouter = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../User/user.constant");
const validRequest_1 = __importDefault(require("../../middlewares/validRequest"));
const booking_validation_1 = require("./booking.validation");
const booking_controller_1 = require("./booking.controller");
const router = (0, express_1.Router)();
router.post("/bookings", (0, auth_1.default)(user_constant_1.USER_ROLE.user), (0, validRequest_1.default)(booking_validation_1.bookingValidation.bookingValidationSchema), booking_controller_1.bookingController.addBooking);
router.get("/bookings", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), booking_controller_1.bookingController.getAllBooking);
router.get("/my-bookings", (0, auth_1.default)(user_constant_1.USER_ROLE.user), booking_controller_1.bookingController.myBookings);
router.put("/bookings/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validRequest_1.default)(booking_validation_1.bookingValidation.updateBookingValidationSchema), booking_controller_1.bookingController.udpateBooking);
router.delete("/bookings/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), booking_controller_1.bookingController.deleteBooking);
exports.bookingsRouter = router;
