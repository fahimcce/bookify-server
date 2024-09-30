import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { bookingService } from "./booking.service";

// confirm payment
const confirmPayment = catchAsync(async (req, res) => {
  const reslut = await bookingService.confiremPayment(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "You payment has successfully received",
    data: reslut,
  });
});

const addBooking = catchAsync(async (req, res) => {
  const result = await bookingService.addBookingDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Your Booking has been received.",
    data: result,
  });
});
const getAllBooking = catchAsync(async (req, res) => {
  const reslut = await bookingService.getAllBookingFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All bookings retrieved successfully",
    data: reslut,
  });
});
const myBookings = catchAsync(async (req, res) => {
  const reslut = await bookingService.getMyBookings(req.user.email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User bookings retrieved successfully",
    data: reslut,
  });
});
// const udpateBooking = catchAsync(async (req, res) => {
//   const result = await bookingService.updateBookingDb(req.params.id, req.body);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Booking updated successfully",
//     data: result,
//   });
// });

const conFirmBookingByAdmin = catchAsync(async (req, res) => {
  const result = await bookingService.confirmBooking(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking Confirm Successfully",
    data: result,
  });
});

const deleteBooking = catchAsync(async (req, res) => {
  const result = await bookingService.deleteBookingDb(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking deleted successfully",
    data: result,
  });
});

export const bookingController = {
  addBooking,
  getAllBooking,
  myBookings,
  deleteBooking,
  confirmPayment,
  conFirmBookingByAdmin,
};
