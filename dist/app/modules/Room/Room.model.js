"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rooms = void 0;
const mongoose_1 = require("mongoose");
const meetingRoomSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    roomNo: {
        type: Number,
        required: true,
        unique: true,
    },
    floorNo: {
        type: Number,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    pricePerSlot: {
        type: Number,
        required: true,
    },
    amenities: {
        type: [String],
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.Rooms = (0, mongoose_1.model)("Room", meetingRoomSchema);
