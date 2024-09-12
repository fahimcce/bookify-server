import { model, Schema } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingModelSchema = new Schema<TBooking>({
  room: { type: Schema.Types.ObjectId, required: true, ref: "Rooms" },
  slots: [{ type: Schema.Types.ObjectId, ref: "Slot" }],
  user: {
    type: Schema.Types.ObjectId,
    required: [true, "User Id is required"],
    ref: "User",
  },
  date: { type: Date, required: [true, "date is required"] },

  totalAmount: {
    type: Number,
    required: [true, "total amount of selected slot"],
  },

  isConfirmed: {
    type: String,
    enum: ["confirmed", "unconfirmed", "canceled"],
    default: "unconfirmed",
  },
  isDeleted: { type: Boolean, default: false },
});

export const Bookings = model<TBooking>("Bookings", bookingModelSchema);
