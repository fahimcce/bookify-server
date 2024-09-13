"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidation = void 0;
const zod_1 = require("zod");
const bookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        room: zod_1.z.string({ required_error: "Room Id is required" }),
        slots: zod_1.z.array(zod_1.z.string()),
        user: zod_1.z.string({ required_error: "User Id is require" }),
        date: zod_1.z.string({ required_error: "booking date is required" }),
        totalAmount: zod_1.z
            .string({ required_error: "Total amount of selected slot" })
            .optional(),
        isConfirmed: zod_1.z
            .enum(["confirmed", "unconfirmed", "canceled"], {
            required_error: "Confirmation status is required",
        })
            .optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
const updateBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        room: zod_1.z.string({ required_error: "Room Id is required" }).optional(),
        slots: zod_1.z.array(zod_1.z.string()).optional(),
        user: zod_1.z.string({ required_error: "User Id is require" }).optional(),
        date: zod_1.z.string({ required_error: "booking date is required" }).optional(),
        totalAmount: zod_1.z
            .string({ required_error: "Total amount of selected slot" })
            .optional(),
        isConfirmed: zod_1.z
            .enum(["confirmed", "unconfirmed", "canceled"], {
            required_error: "Confirmation status is required",
        })
            .optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
exports.bookingValidation = {
    bookingValidationSchema,
    updateBookingValidationSchema,
};
