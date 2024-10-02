"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slotRoute = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middileWare/validateRequest"));
const slot_validation_1 = require("./slot.validation");
const slot_controller_1 = require("./slot.controller");
const authGuared_1 = __importDefault(require("../../middileWare/authGuared"));
const user_constant_1 = require("../User/user.constant");
const router = (0, express_1.Router)();
router.post("/", (0, validateRequest_1.default)(slot_validation_1.slotValidation.addSlotValidationSchema), slot_controller_1.slotController.addSlot);
router.get("/availability", slot_controller_1.slotController.getAllSlot);
router.delete("/delete/:id", (0, authGuared_1.default)(user_constant_1.USER_ROLE.admin), slot_controller_1.slotController.deleteSlot);
router.patch("/update/:id", (0, authGuared_1.default)(user_constant_1.USER_ROLE.admin), slot_controller_1.slotController.updateSlot);
exports.slotRoute = router;
