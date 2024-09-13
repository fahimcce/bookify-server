import { model, Schema } from "mongoose";
import { TSlots } from "./Slots.interface";

const slotSchema = new Schema<TSlots>(
  {
    room: {
      type: Schema.Types.ObjectId,
      required: [true, "room id need for slot"],
      ref: "MeetingRoom",
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

// Add unique index on room, date, startTime, and endTime to prevent duplicates
slotSchema.index(
  { room: 1, date: 1, startTime: 1, endTime: 1 },
  { unique: true }
);

export const Slot = model("Slot", slotSchema);
