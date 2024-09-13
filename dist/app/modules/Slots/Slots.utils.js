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
exports.createSlot = void 0;
const Slots_model_1 = require("./Slots.model");
const createSlot = (startTime, endTime, roomid, date) => __awaiter(void 0, void 0, void 0, function* () {
    const startTimeHoure = startTime.split(":")[0];
    // check if the slot is available
    let slotDate = [];
    const numberOfSlot = parseInt(endTime) - parseInt(startTime);
    for (let i = 0; i < numberOfSlot; i++) {
        const dynamicSlots = {
            room: `${roomid}`,
            date: date,
            isBooked: false,
            startTime: Number(startTimeHoure) + i + ":00",
            endTime: Number(startTimeHoure) + (i + 1) + ":00",
        };
        const slotsData = yield Slots_model_1.Slot.create(dynamicSlots);
        slotDate.push(slotsData);
    }
    return slotDate;
});
exports.createSlot = createSlot;
