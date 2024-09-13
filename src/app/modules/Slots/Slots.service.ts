import httpStatus from "http-status";
import AppError from "../../errors/AppError";

import { TSlots } from "./Slots.interface";
import { Slot } from "./Slots.model";
import { createSlot } from "./Slots.utils";
import handleEmptyData from "../../utils/handleEmptyData";
import { Rooms } from "../Room/Room.model";

const createSlotIntoDB = async (payload: TSlots) => {
  const isRoomAvailable = await Rooms.findById(payload.room);
  if (!isRoomAvailable) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Room not found with ID " + payload.room
    );
  }

  // Check if the slot already exists with room, date, startTime, and endTime
  const isSlotAvailable = await Slot.findOne({
    room: payload.room,
    date: payload.date,
    startTime: payload.startTime,
    endTime: payload.endTime,
  });
  if (isSlotAvailable) {
    throw new AppError(httpStatus.CONFLICT, "Slot Time is not available");
  }

  // Create the new slot if no conflict
  return await createSlot(
    payload.startTime,
    payload.endTime,
    payload.room,
    payload.date
  );
};

const getAllSlotFromDB = async (payload: any) => {
  if (payload.date || payload.roomId) {
    const result = await Slot.find({
      $or: [{ date: payload.date }, { room: payload.roomId }],
      isBooked: false,
    });
    return handleEmptyData(result);
  } else {
    const result = await Slot.find({ isBooked: false });
    return handleEmptyData(result);
  }
};

export const SlotServices = {
  createSlotIntoDB,
  getAllSlotFromDB,
};
