import { model, Schema } from "mongoose";
import { TSlot } from "./slot.interface";

const slotModelSchema = new Schema<TSlot>({
  room: {
    type: Schema.Types.ObjectId,
    required: [true, "room id need for slot"],
    ref: "Rooms",
  },
  date: { type: Date, required: [true, "slot date is required"] },
  startTime: { type: String, required: [true, "start time need"] },
  endTime: { type: String, required: [true, "An end time needed"] },
  isBooked: { type: Boolean, default: false },
});

export const Slot = model<TSlot>("Slot", slotModelSchema);
