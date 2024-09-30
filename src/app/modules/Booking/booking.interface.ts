import { z } from "zod";
import { bookingValidation } from "./booking.validation";
import mongoose from "mongoose";

export type TBooking = {
  room: { _id: mongoose.Types.ObjectId; date: string; slots: mongoose.Types.ObjectId[] }[];
  user: mongoose.Types.ObjectId;
  phone: string;
  paymentId: string;
  email: string;
  paymentTime: number;
  totalAmount: number;
  isConfirmed?: "confirmed" | "unconfirmed" | "canceled";
  isDeleted?: boolean;
};

export type TBookingInfer = z.infer<typeof bookingValidation.bookingValidationSchema>;
