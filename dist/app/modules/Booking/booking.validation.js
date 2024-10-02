"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidation = void 0;
const zod_1 = require("zod");
const bookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        paymentId: zod_1.z.string(),
        paymentTime: zod_1.z.number(),
        phone: zod_1.z.string(),
        room: zod_1.z.array(zod_1.z.object({
            _id: zod_1.z.string(),
            date: zod_1.z.string(), // Assuming the date is in string format
            slots: zod_1.z.array(zod_1.z.string()), // Array of strings for slot IDs
        })),
        totalAmount: zod_1.z.number(),
        user: zod_1.z.string(),
        isConfirmed: zod_1.z.enum(["confirmed", "unconfirmed", "canceled"]),
    }),
});
const updateBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        room: zod_1.z
            .array(zod_1.z.object({
            _id: zod_1.z.string().optional(), // Optional ObjectId
            date: zod_1.z.string().optional(), // Optional string for date
            slots: zod_1.z.array(zod_1.z.string()).optional(), // Optional array of strings for slots
        }))
            .optional(),
        user: zod_1.z.string().optional(), // Optional ObjectId for user
        phone: zod_1.z.string().optional(), // Optional string for phone number
        paymentId: zod_1.z.string().optional(), // Optional string for payment ID
        email: zod_1.z.string().email("Invalid email address").optional(), // Optional email validation
        paymentTime: zod_1.z.string().optional(), // Optional string for payment time
        totalAmount: zod_1.z.number().optional(), // Optional number for total amount
        isConfirmed: zod_1.z.enum(["confirmed", "unconfirmed", "canceled"]).optional(),
    }),
});
exports.bookingValidation = {
    bookingValidationSchema,
    updateBookingValidationSchema,
};
