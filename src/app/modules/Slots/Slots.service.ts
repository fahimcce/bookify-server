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
  const query: any = { isBooked: false };

  // Apply filters if provided in the query
  if (payload.date && payload.roomId) {
    // Both date and roomId are present, so we use $and to ensure both conditions are matched
    query["$and"] = [{ date: payload.date }, { room: payload.roomId }];
  } else if (payload.date) {
    // Only date is provided
    query["date"] = payload.date;
  } else if (payload.roomId) {
    // Only roomId is provided
    query["room"] = payload.roomId;
  }

  // Find slots and populate the room details (including room name)
  const result = await Slot.find(query).populate("room", "name");

  return handleEmptyData(result);
};

export const SlotServices = {
  createSlotIntoDB,
  getAllSlotFromDB,
};
