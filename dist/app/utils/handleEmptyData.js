"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const handleEmptyData = (data) => {
    if ((data === null || data === void 0 ? void 0 : data.length) < 1) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "No Data Found");
    }
    return data;
};
exports.default = handleEmptyData;
