import mongoose from "mongoose";
import { Slot } from "./slot.model";

type TSlots = {
  startTime: string;
  endTime: string;
};

export const generateSlot = async (startTime: string, endTime: string) => {
  const slots = [];
  let current = new Date(`1970-01-01T${startTime}:00`);
  const end = new Date(`1970-01-01T${endTime}:00`);

  while (current < end) {
    const nextSlot = new Date(current.getTime() + 60 * 60 * 1000); // Add 1 hour
    slots.push({
      startTime: current.toTimeString().slice(0, 5),
      endTime: nextSlot.toTimeString().slice(0, 5),
    });
    current = nextSlot;
  }
  return slots;
};

export const checkSlotExist = async (
  roomId: mongoose.Types.ObjectId,
  date: Date,
  slots: TSlots[]
) => {
  const existingSlots = await Slot.find({
    room: roomId,
    date: date,
    $or: slots?.map((slot) => ({
      startTime: { $lt: slot.endTime },
      endTime: { $gt: slot.startTime },
    })),
  });
  return existingSlots.length > 0;
};

export const createSlots = async (
  roomId: mongoose.Types.ObjectId,
  date: Date,
  slots: TSlots[]
) => {
  const newSlots = slots?.map((slot) => ({
    room: roomId,
    date: date,
    startTime: slot.startTime,
    endTime: slot.endTime,
    isBooked: false,
  }));

  return await Slot.insertMany(newSlots);
};
