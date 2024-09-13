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
exports.authServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../User/user.model");
const auth_utils_1 = require("./auth.utils");
const config_1 = __importDefault(require("../../config"));
const signUpIntoDb = (payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    // check use already exist
    const isUserExist = yield user_model_1.User.findOne({ email: payLoad.email });
    if (isUserExist) {
        throw new AppError_1.default(http_status_1.default.ALREADY_REPORTED, "User already Exist. Please login");
    }
    const result = yield user_model_1.User.create(payLoad);
    return result;
});
const loginDb = (payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    // check user exist
    const existingUser = yield user_model_1.User.findOne({
        email: payLoad.email,
    });
    if (!existingUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `User not found with this ${payLoad.email}`);
    }
    const tokenPayload = {
        email: existingUser === null || existingUser === void 0 ? void 0 : existingUser.email,
        role: existingUser === null || existingUser === void 0 ? void 0 : existingUser.role,
    };
    const token = (0, auth_utils_1.createToken)(tokenPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const tokenWithBearer = token;
    const result = { existingUser, token: tokenWithBearer };
    return result;
});
exports.authServices = {
    signUpIntoDb,
    loginDb,
};
