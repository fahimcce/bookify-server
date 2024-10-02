"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middileWare/validateRequest"));
const room_validation_1 = require("./room.validation");
const room_controller_1 = require("./room.controller");
const authGuared_1 = __importDefault(require("../../middileWare/authGuared"));
const user_constant_1 = require("../User/user.constant");
const router = (0, express_1.Router)();
router.post("/", (0, authGuared_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(room_validation_1.roomValidation.createRoomsValidationSchema), room_controller_1.roomsController.createRooms);
router.get("/", room_controller_1.roomsController.getAllRooms);
router.get("/:id", room_controller_1.roomsController.getArooms);
// router.get("/rooms/someRooms", roomsController.getSomeRooms);
// update rooms
router.put("/:id", (0, authGuared_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(room_validation_1.roomValidation.updateRoomsValidationSchema), room_controller_1.roomsController.updateRooms);
router.delete("/:id", (0, authGuared_1.default)(user_constant_1.USER_ROLE.admin), room_controller_1.roomsController.deleteRoom);
exports.roomRoutes = router;
