import { z } from "zod";

const meetingRoomValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    roomNo: z.number({ required_error: "Room number is required" }),
    floorNo: z.number({ required_error: "Floor number is required" }),
    capacity: z.number({ required_error: "Capacity is required" }),
    pricePerSlot: z.number({ required_error: "Price per slot is required" }),
    amenities: z
      .array(z.string())
      .min(1, { message: "At least one amenity is required" }),
    isDeleted: z.boolean().optional(), // optional because it defaults to false
  }),
});

export const RoomValidations = {
  meetingRoomValidationSchema,
};
