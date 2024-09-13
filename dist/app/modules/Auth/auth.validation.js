"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = exports.loginValidationSchema = void 0;
const zod_1 = require("zod");
exports.loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: "Email is required to login" }),
        password: zod_1.z.string({ required_error: "Email is required to login" }),
    }),
});
exports.authValidation = {
    loginValidationSchema: exports.loginValidationSchema,
};
