"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouters = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const authGuared_1 = __importDefault(require("../../middileWare/authGuared"));
const user_constant_1 = require("./user.constant");
const router = express_1.default.Router();
router.get("/", (0, authGuared_1.default)(user_constant_1.USER_ROLE.admin), user_controller_1.userController.getAllUsers);
router.delete("/:id", (0, authGuared_1.default)(user_constant_1.USER_ROLE.admin), user_controller_1.userController.deleteUser);
exports.userRouters = router;
