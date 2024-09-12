import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { MeetingRoom } from "../Room/Room.model";
import { TSlots } from "./Slots.interface";
import { Slot } from "./Slots.model";
import { createSlot } from "./Slots.utils";
import handleEmptyData from "../../utils/handleEmptyData";

const createSlotIntoDB = async (payload: TSlots) => {
  // check slot block or not
  const isRoomAvailable = await MeetingRoom.findById(payload.room);
  if (!isRoomAvailable) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Room not found with this " + payload.room
    );
  }
  // check the slot shedule is available
  const isSlotAvailabe = await Slot.findOne({
    room: payload.room,
    date: payload.date,
  });
  if (isSlotAvailabe) {
    throw new AppError(httpStatus.CONFLICT, "Slot Time is not available");
  } else
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
