"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slotRoute = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../User/user.constant");
const validRequest_1 = __importDefault(require("../../middlewares/validRequest"));
const Slots_validation_1 = require("./Slots.validation");
const Slots_controller_1 = require("./Slots.controller");
const router = (0, express_1.Router)();
router.post("/", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validRequest_1.default)(Slots_validation_1.SlotsValidations.slotValidationSchema), Slots_controller_1.SlotControllers.createSlot);
router.get("/availability", Slots_controller_1.SlotControllers.getAllSlots);
exports.slotRoute = router;
