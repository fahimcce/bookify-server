import { z } from "zod";
import { slotValidation } from "./slot.validation";
import mongoose from "mongoose";

export type TSlot = {
  date: Date;
  room: mongoose.Types.ObjectId;
  startTime: string;
  endTime: string;
  isBooked?: boolean;
};

// type TSlots = z.infer<typeof slotValidation.addSlotValidationSchema>;
