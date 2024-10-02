"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bookings = void 0;
const mongoose_1 = require("mongoose");
const bookingModelSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    isConfirmed: {
        type: String,
        enum: ["confirmed", "unconfirmed", "canceled"],
        default: "unconfirmed",
    },
    paymentId: { type: String, required: true },
    paymentTime: { type: Number, required: true },
    phone: { type: String, required: true },
    room: [
        {
            _id: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Rooms" },
            date: { type: String, required: true },
            slots: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Slot", required: true }],
        },
    ],
    totalAmount: { type: Number, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "User" },
    isDeleted: { type: Boolean, default: false },
});
exports.Bookings = (0, mongoose_1.model)("Bookings", bookingModelSchema);
