import mongoose from "mongoose";

export type TBooking = {
  date: Date;
  room: mongoose.Types.ObjectId;
  slots: mongoose.Types.ObjectId[];
  user: mongoose.Types.ObjectId;
  totalAmount?: number;
  isConfirmed?: "confirmed" | "unconfirmed" | "canceled";
  isDeleted?: boolean;
};
