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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const Room_model_1 = require("./Room.model");
const mongoose_1 = __importDefault(require("mongoose"));
const createRoomIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Room_model_1.Rooms.create(payload);
    return result;
});
const getSingleRoomFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Room_model_1.Rooms.findById(id);
    return result;
});
const getAllRoomsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const meetingQuery = new QueryBuilder_1.default(Room_model_1.Rooms.find(), query);
    const result = yield meetingQuery.modelQuery;
    return result;
});
// ------------------------update Rooms----------------------------
const updateRoomsIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, roomNo, floorNo, capacity, pricePerSlot, amenities } = payload, remainingRoomData = __rest(payload, ["name", "roomNo", "floorNo", "capacity", "pricePerSlot", "amenities"]);
    // Find the existing room document
    const existingRoom = yield Room_model_1.Rooms.findById(id);
    if (!existingRoom) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "ID Not Found!!");
    }
    // Merge new amenities with existing ones
    let updatedAmenities = existingRoom.amenities || [];
    if (amenities && Array.isArray(amenities)) {
        updatedAmenities = Array.from(new Set([...updatedAmenities, ...amenities]));
    }
    // Prepare the data for update
    const modifiedUpdateData = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, remainingRoomData), (name ? { name } : {})), (roomNo ? { roomNo } : {})), (floorNo ? { floorNo } : {})), (capacity ? { capacity } : {})), (pricePerSlot ? { pricePerSlot } : {})), { amenities: updatedAmenities });
    // Update the room in the database
    const result = yield Room_model_1.Rooms.findByIdAndUpdate(id, modifiedUpdateData, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteRoomFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const deletedRoom = yield Room_model_1.Rooms.findByIdAndUpdate(id, { isDeleted: true }, { new: true, session });
        if (!deletedRoom) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to delete Room !");
        }
        yield session.commitTransaction();
        yield session.endSession();
        return deletedRoom;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        if (err instanceof AppError_1.default) {
            throw err;
        }
        throw new Error("An unexpected error occurred while deleting the room");
    }
});
exports.RoomServices = {
    createRoomIntoDB,
    getSingleRoomFromDB,
    getAllRoomsFromDB,
    updateRoomsIntoDB,
    deleteRoomFromDB,
};
