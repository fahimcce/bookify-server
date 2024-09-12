import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { bookingService } from "./booking.sevice";

const addBooking = catchAsync(async (req, res) => {
  const result = await bookingService.createBookingToDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking created successfully",
    data: result,
  });
});
const getAllBooking = catchAsync(async (req, res) => {
  const reslut = await bookingService.getAllBookingFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All bookings retrieved successfully",
    data: reslut,
  });
});
const myBookings = catchAsync(async (req, res) => {
  const reslut = await bookingService.getMyBookingsFromDB(req.user.email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User bookings retrieved successfully",
    data: reslut,
  });
});
const udpateBooking = catchAsync(async (req, res) => {
  const result = await bookingService.updateBookingToDB(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking updated successfully",
    data: result,
  });
});
const deleteBooking = catchAsync(async (req, res) => {
  const result = await bookingService.deleteBookingTODB(req.params.id);
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
  udpateBooking,
  deleteBooking,
};
