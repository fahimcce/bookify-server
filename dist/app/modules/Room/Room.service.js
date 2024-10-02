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
exports.roomsServices = void 0;
const room_model_1 = require("./room.model");
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const creatRooms = (payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Rooms.create(payLoad);
    return result;
});
// get a rooms
const getAllRoomsFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const roomquery = new queryBuilder_1.default(room_model_1.Rooms.find({ isDeleted: false }), query)
        .filter()
        .sort()
        .limit()
        .paginate()
        .roomsId();
    const result = yield roomquery.modelQuery;
    const meta = yield roomquery.countTotal();
    return { result, meta };
    // return result;
});
// get a rooms
const getAroomsFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Rooms.findById(id);
    return result;
});
// update rooms into db
const updateRoomsIntoDb = (id, payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    // const { amenities, ...restData } = payLoad;
    const result = yield room_model_1.Rooms.findByIdAndUpdate(id, payLoad, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteRoomFromDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Rooms.findByIdAndUpdate(payload, { isDeleted: true }, { new: true });
    return result;
});
exports.roomsServices = {
    creatRooms,
    getAllRoomsFromDb,
    getAroomsFromDb,
    updateRoomsIntoDb,
    deleteRoomFromDb,
};
