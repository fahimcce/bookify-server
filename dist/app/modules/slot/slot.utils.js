"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSlots = exports.checkSlotExist = exports.generateSlot = void 0;
const slot_model_1 = require("./slot.model");
const generateSlot = (startTime, endTime) => __awaiter(void 0, void 0, void 0, function* () {
    const slots = [];
    let current = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    while (current < end) {
        const nextSlot = new Date(current.getTime() + 60 * 60 * 1000); // Add 1 hour
        slots.push({
            startTime: current.toTimeString().slice(0, 5),
            endTime: nextSlot.toTimeString().slice(0, 5),
        });
        current = nextSlot;
    }
    return slots;
});
exports.generateSlot = generateSlot;
const checkSlotExist = (roomId, date, slots) => __awaiter(void 0, void 0, void 0, function* () {
    const existingSlots = yield slot_model_1.Slot.find({
        room: roomId,
        date: date,
        $or: slots === null || slots === void 0 ? void 0 : slots.map((slot) => ({
            startTime: { $lt: slot.endTime },
            endTime: { $gt: slot.startTime },
        })),
    });
    return existingSlots.length > 0;
});
exports.checkSlotExist = checkSlotExist;
const createSlots = (roomId, date, slots) => __awaiter(void 0, void 0, void 0, function* () {
    const newSlots = slots === null || slots === void 0 ? void 0 : slots.map((slot) => ({
        room: roomId,
        date: date,
        startTime: slot.startTime,
        endTime: slot.endTime,
        isBooked: false,
    }));
    return yield slot_model_1.Slot.insertMany(newSlots);
});
exports.createSlots = createSlots;
