"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slot = void 0;
const mongoose_1 = require("mongoose");
const slotSchema = new mongoose_1.Schema({
    room: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "room id need for slot"],
        ref: "MeetingRoom",
    },
    date: { type: Date, required: [true, "slot date is required"] },
    startTime: { type: String, required: [true, "start time need"] },
    endTime: { type: String, required: [true, "An end time needed"] },
    isBooked: { type: Boolean, default: false },
}, {
    timestamps: true,
});
// Add unique index on room, date, startTime, and endTime to prevent duplicates
slotSchema.index({ room: 1, date: 1, startTime: 1, endTime: 1 }, { unique: true });
exports.Slot = (0, mongoose_1.model)("Slot", slotSchema);
