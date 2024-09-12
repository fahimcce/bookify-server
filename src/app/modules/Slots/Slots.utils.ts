import mongoose, { ObjectId } from "mongoose";
import { Slot } from "./Slots.model";

export const createSlot = async (
  startTime: string,
  endTime: string,
  roomid: any,
  date: Date
) => {
  const startTimeHoure = startTime.split(":")[0];
  // check if the slot is available
  let slotDate = [];
  const numberOfSlot = parseInt(endTime) - parseInt(startTime);

  for (let i = 0; i < numberOfSlot; i++) {
    const dynamicSlots = {
      room: `${roomid}`,
      date: date,
      isBooked: false,
      startTime: Number(startTimeHoure) + i + ":00",
      endTime: Number(startTimeHoure) + (i + 1) + ":00",
    };
    const slotsData = await Slot.create(dynamicSlots);
    slotDate.push(slotsData);
  }
  return slotDate;
};
