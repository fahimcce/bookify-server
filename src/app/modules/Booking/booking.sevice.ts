import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Slot } from "../Slots/Slots.model";
import { TBooking } from "./booking.interface";
import { Rooms } from "../Room/Room.model";
import { Bookings } from "./booking.model";
import handleEmptyData from "../../utils/handleEmptyData";
import { User } from "../User/user.model";

const addBookingDb = async (payload: TBooking) => {
  // Check if slots are available
  const availableSlots = await Slot.find({
    _id: { $in: payload.slots },
    date: payload.date,
    isBooked: false,
  });

  if (availableSlots.length !== payload.slots.length) {
    throw new AppError(httpStatus.BAD_REQUEST, "Some slots are already booked");
  }

  // Get the room
  const targetedRoom = await Rooms.findById(payload.room);
  if (!targetedRoom) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Room ID ${payload.room} is invalid or not found`
    );
  }

  // Calculate total amount
  payload.totalAmount = targetedRoom.pricePerSlot * payload.slots.length;

  // Create the booking
  const result = await Bookings.create(payload);

  // Mark slots as booked
  await Slot.updateMany({ _id: { $in: payload.slots } }, { isBooked: true });

  // Populate the result for returning
  const lastBooking = await Bookings.findById(result._id)
    .populate("room")
    .populate("slots")
    .populate("user");

  return lastBooking;
};

const getAllBookingFromDb = async () => {
  const result = await Bookings.find({ isDeleted: false })
    .populate("room")
    .populate("slots")
    .populate("user");
  return handleEmptyData(result);
};
const getMyBookings = async (payload: string) => {
  // get the user First
  const userData = await User.findOne({ email: payload, isDeleted: false });
  const userId = userData?._id;
  const result = await Bookings.findOne({ user: userId })
    .populate("room")
    .populate("slots")
    .populate("user");
  return handleEmptyData(result);
};
const updateBookingDb = async (id: string, payload: TBooking) => {
  await Bookings.findByIdAndUpdate(id, payload, { new: true });
  const bookedi = await Bookings.findById(id)
    .populate("room")
    .populate("slots")
    .populate("user");
  return bookedi;
};
const deleteBookingDb = async (id: string) => {
  // confirm bookings is exist
  const isExist = await Bookings.findById(id);
  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, "No Booking Found");
  }
  const result = await Bookings.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true }
  );
  return result;
};
export const bookingService = {
  addBookingDb,
  getAllBookingFromDb,
  getMyBookings,
  updateBookingDb,
  deleteBookingDb,
};
