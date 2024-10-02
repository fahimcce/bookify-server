import { z } from "zod";

const bookingValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    paymentId: z.string(),
    paymentTime: z.number(),
    phone: z.string(),
    room: z.array(
      z.object({
        _id: z.string(),
        date: z.string(), // Assuming the date is in string format
        slots: z.array(z.string()), // Array of strings for slot IDs
      })
    ),
    totalAmount: z.number(),
    user: z.string(),
    isConfirmed: z.enum(["confirmed", "unconfirmed", "canceled"]),
  }),
});

const updateBookingValidationSchema = z.object({
  body: z.object({
    room: z
      .array(
        z.object({
          _id: z.string().optional(), // Optional ObjectId
          date: z.string().optional(), // Optional string for date
          slots: z.array(z.string()).optional(), // Optional array of strings for slots
        })
      )
      .optional(),
    user: z.string().optional(), // Optional ObjectId for user
    phone: z.string().optional(), // Optional string for phone number
    paymentId: z.string().optional(), // Optional string for payment ID
    email: z.string().email("Invalid email address").optional(), // Optional email validation
    paymentTime: z.string().optional(), // Optional string for payment time
    totalAmount: z.number().optional(), // Optional number for total amount
    isConfirmed: z.enum(["confirmed", "unconfirmed", "canceled"]).optional(),
  }),
});

export const bookingValidation = {
  bookingValidationSchema,
  updateBookingValidationSchema,
};
