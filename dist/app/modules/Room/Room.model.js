"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rooms = void 0;
const mongoose_1 = require("mongoose");
const roomsModelSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    roomNo: { type: Number, required: true },
    floorNo: { type: Number, required: true },
    capacity: { type: Number, required: true },
    pricePerSlot: { type: Number, required: true },
    amenities: [{ type: String }],
    roomImg: [{ type: String, default: "" }],
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
exports.Rooms = (0, mongoose_1.model)("Rooms", roomsModelSchema);
