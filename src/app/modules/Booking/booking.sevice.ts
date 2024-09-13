import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Slot } from "../Slots/Slots.model";
import { TBooking } from "./booking.interface";
import { Rooms } from "../Room/Room.model";
import { Bookings } from "./booking.model";
import handleEmptyData from "../../utils/handleEmptyData";
import { User } from "../User/user.model";

const addBookingDb = async (payload: TBooking) => {
  // check slot by date and room available or not
  const isExistSlot = await Slot.find({
    _id: payload.slots,
    date: payload.date,
    isBooked: false,
  });

  if (!isExistSlot.length) {
    throw new AppError(httpStatus.NOT_FOUND, "Slot already Booked");
  }
  // get rooms
  const targetedRooms = await Rooms.findById(payload.room);
  if (!targetedRooms) {
    throw new AppError(httpStatus.NOT_FOUND, "Room not Found");
  }
  payload.totalAmount = targetedRooms?.pricePerSlot * payload.slots.length;
  const result = await Bookings.create(payload);
  const newBookingId = result._id;
  // change the isBooked status
  await Slot.updateMany(
    { _id: payload.slots },
    { isBooked: true },
    { new: true }
  );

  const lastBookinged = await Bookings.findById(newBookingId)
    .populate("room")
    .populate("slots")
    .populate("user");
  return lastBookinged;
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
