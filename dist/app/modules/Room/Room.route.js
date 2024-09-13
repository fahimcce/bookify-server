"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomRoutes = void 0;
const express_1 = require("express");
const user_constant_1 = require("../User/user.constant");
const validRequest_1 = __importDefault(require("../../middlewares/validRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const Room_controller_1 = require("./Room.controller");
const Room_validation_1 = require("./Room.validation");
const router = (0, express_1.Router)();
router.post("/", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validRequest_1.default)(Room_validation_1.roomValidation.createRoomsValidationSchema), Room_controller_1.RoomControllers.createRoom);
router.get("/", Room_controller_1.RoomControllers.getAllRooms);
router.get("/:id", Room_controller_1.RoomControllers.getSingleRoom);
// update rooms
router.put("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validRequest_1.default)(Room_validation_1.roomValidation.updateRoomsValidationSchema), Room_controller_1.RoomControllers.updateRooms);
router.delete("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), Room_controller_1.RoomControllers.deleteRoom);
exports.roomRoutes = router;
