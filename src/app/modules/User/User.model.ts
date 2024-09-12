import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

const UserSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: 0 },
    phone: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    address: { type: String, required: true },
    isDeleted: { type: Boolean, default: false, select: 0 },
  },
  {
    timestamps: true,
  }
);

export const User = model<TUser>("User", UserSchema);
