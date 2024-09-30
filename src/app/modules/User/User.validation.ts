import { string, z } from "zod";

const createUserValidationSchma = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    email: z.string({ required_error: "Email is required" }),
    password: z.string().optional(),
    phone: z.string({ required_error: "phone is required" }),
    role: z.enum(["user", "admin"]).default("user"),
    address: z.string({ required_error: "address is required" }),
  }),
});
export const userValidations = {
  createUserValidationSchma,
};
