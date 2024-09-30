import { model } from "mongoose";
import httpStatus from "http-status";
import AppError from "../../erros/AppError";
import { Rooms } from "../Room/room.model";
import { TBooking } from "./booking.interface";
import { Bookings } from "./booking.model";
import { Slot } from "../slot/slot.model";
import { User } from "../User/user.model";

import Stripe from "stripe";
import config from "../../config";

const stripe = new Stripe(config.SECRET_KET as any);

const confiremPayment = async (payload: { paymentId: string; total: number }) => {
  const { paymentId, total } = payload;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total * 100,
    currency: "usd",
    payment_method: paymentId,
    confirm: true,
    return_url: `${config.CLIENT_SITE_URL}/success`,
  });
  return paymentIntent;
};

const addBookingDb = async (payload: TBooking) => {
  const roomIds: string[] = [];
  const slotsids: string[] = [];
  payload?.room?.map((room) => {
    roomIds.push(`${room._id}`);
    room?.slots?.map((slot) => {
      slotsids.push(`${slot}`);
    });
  });
  // console.log(payload);
  const isUserExist = await User.find({ email: payload.email, _id: payload.user });
  if (!isUserExist.length) {
    throw new AppError(httpStatus.NOT_FOUND, "Invalid User");
  }
  // check room is available
  const roomAvailable = await Rooms.find({
    _id: { $in: roomIds },
  });
  if (!roomAvailable.length) {
    throw new AppError(httpStatus.NOT_FOUND, "Room Not Found");
  }
  // check slot by date and room available or not

  const isExistSlot = await Slot.find({
    _id: { $in: slotsids },
    isBooked: false,
  });

  if (!isExistSlot?.length) {
    throw new AppError(httpStatus.NOT_FOUND, "Slot is not available");
  }

  const result = await Bookings.create(payload);
  // const newBookingId = result._id;
  // change the isBooked status
  await Slot.updateMany({ _id: { $in: slotsids } }, { isBooked: true }, { new: true });
  return result;

  // const lastBookinged = await Bookings.findById(newBookingId).populate("room").populate("slots").populate("user");
};
const getAllBookingFromDb = async () => {
  const result = await Bookings.find({ isDeleted: false })
    .populate({
      path: "room",
      populate: { path: "_id slots" },
    })
    .populate("user");

  return result;
};
const getMyBookings = async (payload: string) => {
  // get the user First
  const userData = await Bookings.find({ email: payload, isDeleted: false })
    .populate({
      path: "room",
      populate: { path: "_id slots" },
    })
    .populate("user");

  return userData;
};
// const updateBookingDb = async (id: string, payload: TBooking) => {
//   await Bookings.findByIdAndUpdate(id, payload, { new: true });
//   const bookedi = await Bookings.findById(id).populate("room").populate("slots").populate("user");
//   return bookedi;
// };

const confirmBooking = async (id: string, payload: { status: string }) => {
  console.log(payload);
  const result = await Bookings.findByIdAndUpdate(id, { isConfirmed: payload.status }, { new: true, runValidators: true });
  return result;
};

const deleteBookingDb = async (id: string) => {
  // confirm bookings is exist
  const isExist = await Bookings.findById(id);
  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, "No Booking Found");
  }
  const result = await Bookings.findByIdAndUpdate(id, { isDeleted: true }, { new: true, runValidators: true });
  return result;
};

export const bookingService = {
  addBookingDb,
  getAllBookingFromDb,
  getMyBookings,
  deleteBookingDb,
  confiremPayment,
  confirmBooking,
};
