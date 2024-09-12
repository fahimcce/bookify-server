import { z } from "zod";

const bookingValidationSchema = z.object({
  body: z.object({
    room: z.string({ required_error: "Room Id is required" }),
    slots: z.array(z.string()),
    user: z.string({ required_error: "User Id is require" }),
    date: z.string({ required_error: "booking date is required" }),
    totalAmount: z
      .string({ required_error: "Total amount of selected slot" })
      .optional(),
    isConfirmed: z
      .enum(["confirmed", "unconfirmed", "canceled"], {
        required_error: "Confirmation status is required",
      })
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});
const updateBookingValidationSchema = z.object({
  body: z.object({
    room: z.string({ required_error: "Room Id is required" }).optional(),
    slots: z.array(z.string()).optional(),
    user: z.string({ required_error: "User Id is require" }).optional(),
    date: z.string({ required_error: "booking date is required" }).optional(),
    totalAmount: z
      .string({ required_error: "Total amount of selected slot" })
      .optional(),
    isConfirmed: z
      .enum(["confirmed", "unconfirmed", "canceled"], {
        required_error: "Confirmation status is required",
      })
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const bookingValidation = {
  bookingValidationSchema,
  updateBookingValidationSchema,
};
