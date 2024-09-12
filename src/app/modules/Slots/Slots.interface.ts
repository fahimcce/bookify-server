import mongoose, { Types } from "mongoose";

export type TSlots = {
  date: Date;
  room: mongoose.Types.ObjectId;
  startTime: string;
  endTime: string;
  isBooked: boolean;
};
