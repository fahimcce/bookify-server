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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const Slots_model_1 = require("../Slots/Slots.model");
const Room_model_1 = require("../Room/Room.model");
const booking_model_1 = require("./booking.model");
const handleEmptyData_1 = __importDefault(require("../../utils/handleEmptyData"));
const user_model_1 = require("../User/user.model");
const addBookingDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check slot by date and room available or not
    const isExistSlot = yield Slots_model_1.Slot.find({
        _id: payload.slots,
        date: payload.date,
        isBooked: false,
    });
    if (!isExistSlot.length) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Slot already Booked");
    }
    // get rooms
    const targetedRooms = yield Room_model_1.Rooms.findById(payload.room);
    if (!targetedRooms) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Room not Found");
    }
    payload.totalAmount = (targetedRooms === null || targetedRooms === void 0 ? void 0 : targetedRooms.pricePerSlot) * payload.slots.length;
    const result = yield booking_model_1.Bookings.create(payload);
    const newBookingId = result._id;
    // change the isBooked status
    yield Slots_model_1.Slot.updateMany({ _id: payload.slots }, { isBooked: true }, { new: true });
    const lastBookinged = yield booking_model_1.Bookings.findById(newBookingId)
        .populate("room")
        .populate("slots")
        .populate("user");
    return lastBookinged;
});
const getAllBookingFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Bookings.find({ isDeleted: false })
        .populate("room")
        .populate("slots")
        .populate("user");
    return (0, handleEmptyData_1.default)(result);
});
const getMyBookings = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // get the user First
    const userData = yield user_model_1.User.findOne({ email: payload, isDeleted: false });
    const userId = userData === null || userData === void 0 ? void 0 : userData._id;
    const result = yield booking_model_1.Bookings.findOne({ user: userId })
        .populate("room")
        .populate("slots")
        .populate("user");
    return (0, handleEmptyData_1.default)(result);
});
const updateBookingDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield booking_model_1.Bookings.findByIdAndUpdate(id, payload, { new: true });
    const bookedi = yield booking_model_1.Bookings.findById(id)
        .populate("room")
        .populate("slots")
        .populate("user");
    return bookedi;
});
const deleteBookingDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // confirm bookings is exist
    const isExist = yield booking_model_1.Bookings.findById(id);
    if (!isExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "No Booking Found");
    }
    const result = yield booking_model_1.Bookings.findByIdAndUpdate(id, { isDeleted: true }, { new: true, runValidators: true });
    return result;
});
exports.bookingService = {
    addBookingDb,
    getAllBookingFromDb,
    getMyBookings,
    updateBookingDb,
    deleteBookingDb,
};
