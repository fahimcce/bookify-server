import { z } from "zod";

const createRoomsValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    roomNo: z.number(),
    floorNo: z.number(),
    capacity: z.number(),
    pricePerSlot: z.number(),
    amenities: z.array(z.string()),
    images: z.array(z.string()).optional(),
  }),
});

const updateRoomsValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    roomNo: z.number().optional(),
    floorNo: z.number().optional(),
    capacity: z.number().optional(),
    pricePerSlot: z.number().optional(),
    amenities: z.array(z.string()).optional(),
    images: z.array(z.string()).optional(),
  }),
});
export const roomValidation = {
  createRoomsValidationSchema,
  updateRoomsValidationSchema,
};
