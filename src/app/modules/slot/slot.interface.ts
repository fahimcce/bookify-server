import mongoose from "mongoose";

export type TSlot = {
  date: Date;
  room: mongoose.Types.ObjectId;
  startTime: string;
  endTime: string;
  isBooked?: boolean;
};
