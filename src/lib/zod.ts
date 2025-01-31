import { z } from "zod";

export const userSchema = z.object({
    name: z
        .string()
        .min(3, "O nome deve ter pelo menos 3 caracteres")
        .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "O nome deve conter apenas letras"),
    phone: z
        .string()
        .regex(/^[\d\s]+$/, "O telefone deve conter apenas números e espaços")
        .min(10, "O telefone deve ter pelo menos 10 dígitos")
        .max(14, "O telefone deve ter no máximo 14 caracteres"),
    email: z.string().email("Informe um e-mail válido"),
    password: z.string().min(5, "A senha deve ter pelo menos 8 caracteres"),
});

export const loginSchema = z.object({
    email: z
        .string()
        .nonempty("O e-mail é obrigatório")
        .email("Informe um e-mail válido"),
    password: z
        .string()
        .nonempty("A senha é obrigatória")
        .min(8, "A senha deve ter pelo menos 8 caracteres"),
});

export const ForgotPasswordSchema = z.object({
    forgotEmail: z
        .string()
        .nonempty("O e-mail é obrigatório")
        .email("Informe um e-mail válido"),
});
