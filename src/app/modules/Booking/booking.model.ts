import { model, Schema } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingModelSchema = new Schema<TBooking>({
  email: { type: String, required: true },
  isConfirmed: { type: String, enum: ["confirmed", "unconfirmed", "canceled"], default: "unconfirmed" },
  paymentId: { type: String, required: true },
  paymentTime: { type: Number, required: true },
  phone: { type: String, required: true },
  room: [
    {
      _id: { type: Schema.Types.ObjectId, required: true, ref: "Rooms" },
      date: { type: String, required: true },
      slots: [{ type: Schema.Types.ObjectId, ref: "Slot", required: true }],
    },
  ],
  totalAmount: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  isDeleted: { type: Boolean, default: false },
});

export const Bookings = model<TBooking>("Bookings", bookingModelSchema);
