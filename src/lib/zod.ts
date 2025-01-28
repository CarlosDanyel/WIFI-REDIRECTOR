import { object, string } from "zod";

export const signInSchema = object({
    email: string(),
    password: string(),
    name: string(),
    phone: string(),
});
