"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidations = void 0;
const zod_1 = require("zod");
const createUserValidationSchma = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is required" }),
        email: zod_1.z.string({ required_error: "Email is required" }),
        password: zod_1.z.string().optional(),
        phone: zod_1.z.string({ required_error: "phone is required" }),
        role: zod_1.z.enum(["user", "admin"]).default("user"),
        address: zod_1.z.string({ required_error: "address is required" }),
    }),
});
exports.userValidations = {
    createUserValidationSchma,
};
