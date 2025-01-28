import { object, z } from "zod";

export const signInSchema = object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string(),
    phone: z.string(),
});
