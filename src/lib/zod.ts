import { object, z } from "zod";

export const signInSchema = object({
    email: z.string(),
    password: z.string(),
    name: z.string(),
    phone: z.string(),
});
