"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slotValidation = void 0;
const zod_1 = require("zod");
const timeStringSchema = zod_1.z.string({ required_error: "Start and End time needed" }).refine((time) => {
    const regex = /^[01]?[0-9]|2[0-3]:[0-5][0-9]/;
    return regex.test(time);
});
const addSlotValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        room: zod_1.z.string({ required_error: "room id needed" }),
        date: zod_1.z.string({ required_error: "slot date is required" }),
        startTime: timeStringSchema,
        endTime: timeStringSchema,
        isBooked: zod_1.z.boolean().optional(),
    })
        .refine((body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return start < end;
    }, {
        message: "Start time shouldn't before end time",
    }),
});
const updateValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        room: zod_1.z.string({ required_error: "room id needed" }).optional(),
        date: zod_1.z.string({ required_error: "slot date is required" }).optional(),
        startTime: timeStringSchema.optional(),
        endTime: timeStringSchema.optional(),
        isBooked: zod_1.z.boolean().optional(),
    })
        .refine((body) => {
        if (body.startTime && body.endTime) {
            const start = new Date(`1970-01-01T${body.startTime}:00`);
            const end = new Date(`1970-01-01T${body.endTime}:00`);
            return start < end;
        }
        return true;
    }, {
        message: "Start time shouldn't be before end time",
        path: ["endTime"], // Specify where the error message should appear
    }),
});
exports.slotValidation = {
    addSlotValidationSchema,
    updateValidationSchema,
};
