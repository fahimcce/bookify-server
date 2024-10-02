"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../erros/handleZodError"));
const handleValidationError_1 = __importDefault(require("../erros/handleValidationError"));
const handleCastError_1 = __importDefault(require("../erros/handleCastError"));
const handleDuplicateError_1 = __importDefault(require("../erros/handleDuplicateError"));
const AppError_1 = __importDefault(require("../erros/AppError"));
const config_1 = __importDefault(require("../config"));
const globalErrorhandler = (err, req, res, next) => {
    let statusCode = err.statusCode ? err.statusCode : 500;
    let message = "Something went wrong";
    let errorMessages = [
        {
            path: "",
            message: "Something went wrong",
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const simpliFiedzodError = (0, handleZodError_1.default)(err);
        statusCode = simpliFiedzodError.statusCode;
        message = simpliFiedzodError.message;
        errorMessages = simpliFiedzodError === null || simpliFiedzodError === void 0 ? void 0 : simpliFiedzodError.errorSource;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "ValidationError") {
        const simpliFiedError = (0, handleValidationError_1.default)(err);
        statusCode = simpliFiedError.statusCode;
        message = simpliFiedError.message;
        errorMessages = simpliFiedError.errorSource;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "CastError") {
        const simplifiedError = (0, handleCastError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorSource;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const simplifiedError = (0, handleDuplicateError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.erroSource;
    }
    else if (err instanceof Error) {
        message = err.message;
        errorMessages = [
            {
                path: "",
                message: err.message,
            },
        ];
    }
    if (err instanceof AppError_1.default) {
        return res.status(statusCode).json({
            success: false,
            statusCode: statusCode,
            message,
            data: [],
            // stack: config.NODE_ENV === "development" && err?.stack,
        });
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        err,
        stack: config_1.default.NODE_ENV === "development" && (err === null || err === void 0 ? void 0 : err.stack),
    });
};
exports.default = globalErrorhandler;
