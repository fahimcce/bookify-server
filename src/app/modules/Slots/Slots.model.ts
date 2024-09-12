import { model, Schema } from "mongoose";
import { TSlots } from "./Slots.interface";

const slotSchema = new Schema<TSlots>(
  {
    room: {
      type: Schema.Types.ObjectId,
      required: [true, "room id need for slot"],
    },
    date: { type: Date, required: [true, "slot date is required"] },
    startTime: { type: String, required: [true, "start time need"] },
    endTime: { type: String, required: [true, "An end time needed"] },
    isBooked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Slot = model("Slot", slotSchema);
