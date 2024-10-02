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
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("../../config"));
const user_model_1 = require("../User/user.model");
const AppError_1 = __importDefault(require("../../erros/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const room_model_1 = require("../Room/room.model");
const slot_model_1 = require("../slot/slot.model");
const booking_model_1 = require("./booking.model");
const stripe = new stripe_1.default(config_1.default.SECRET_KEY);
const confiremPayment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { paymentId, total } = payload;
    const paymentIntent = yield stripe.paymentIntents.create({
        amount: total * 100,
        currency: "usd",
        payment_method: paymentId,
        confirm: true,
        return_url: `${config_1.default.CLIENT_SITE_URL}/success`,
    });
    return paymentIntent;
});
const addBookingDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const roomIds = [];
    const slotsids = [];
    (_a = payload === null || payload === void 0 ? void 0 : payload.room) === null || _a === void 0 ? void 0 : _a.map((room) => {
        var _a;
        roomIds.push(`${room._id}`);
        (_a = room === null || room === void 0 ? void 0 : room.slots) === null || _a === void 0 ? void 0 : _a.map((slot) => {
            slotsids.push(`${slot}`);
        });
    });
    // console.log(payload);
    const isUserExist = yield user_model_1.User.find({
        email: payload.email,
        _id: payload.user,
    });
    if (!isUserExist.length) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Invalid User");
    }
    // check room is available
    const roomAvailable = yield room_model_1.Rooms.find({
        _id: { $in: roomIds },
    });
    if (!roomAvailable.length) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Room Not Found");
    }
    const isExistSlot = yield slot_model_1.Slot.find({
        _id: { $in: slotsids },
        isBooked: false,
    });
    if (!(isExistSlot === null || isExistSlot === void 0 ? void 0 : isExistSlot.length)) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Slot is not available");
    }
    const result = yield booking_model_1.Bookings.create(payload);
    yield slot_model_1.Slot.updateMany({ _id: { $in: slotsids } }, { isBooked: true }, { new: true });
    return result;
});
const getAllBookingFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Bookings.find({ isDeleted: false })
        .populate({
        path: "room",
        populate: { path: "_id slots" },
    })
        .populate("user");
    return result;
});
const getMyBookings = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // get the user First
    const userData = yield booking_model_1.Bookings.find({ email: payload, isDeleted: false })
        .populate({
        path: "room",
        populate: { path: "_id slots" },
    })
        .populate("user");
    return userData;
});
const confirmBooking = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const result = yield booking_model_1.Bookings.findByIdAndUpdate(id, { isConfirmed: payload.status }, { new: true, runValidators: true });
    return result;
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
    deleteBookingDb,
    confiremPayment,
    confirmBooking,
};
