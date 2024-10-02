"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slot = void 0;
const mongoose_1 = require("mongoose");
const slotModelSchema = new mongoose_1.Schema({
    room: { type: mongoose_1.Schema.Types.ObjectId, required: [true, "room id need for slot"], ref: "Rooms" },
    date: { type: Date, required: [true, "slot date is required"] },
    startTime: { type: String, required: [true, "start time need"] },
    endTime: { type: String, required: [true, "An end time needed"] },
    isBooked: { type: Boolean, default: false },
});
// slotModelSchema.pre("find", async function (next) {
//   const allAvailableSlot = await Slot.find({
//     isBooked: false,
//   });
// });
exports.Slot = (0, mongoose_1.model)("Slot", slotModelSchema);
