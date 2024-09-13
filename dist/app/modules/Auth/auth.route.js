"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validRequest_1 = __importDefault(require("../../middlewares/validRequest"));
const user_validation_1 = require("../User/user.validation");
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
router.post("/signup", (0, validRequest_1.default)(user_validation_1.userValidations.userValidationSchema), auth_controller_1.authController.signUp);
router.post("/login", (0, validRequest_1.default)(auth_validation_1.authValidation.loginValidationSchema), auth_controller_1.authController.login);
exports.authRoutes = router;
