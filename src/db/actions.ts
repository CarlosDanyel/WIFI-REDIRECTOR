"use server";

import { db } from ".";
import { getUser } from "./queries";
import { users } from "./schema";
import { saltAndHashPassword } from "@/lib/utils";

export async function createUser(formData: UserData) {
    try {
        const { email, name, phone, password } = formData;

        if (!email || !name || !phone || !password) {
            throw new Error("Todos os campos são obrigatórios.");
        }

        const hashedPassword = await saltAndHashPassword(password);

        const existedUser = await getUser(email);

        if (existedUser) {
            throw new Error("Usuário já existe. Entre ou mude de senha.");
        }

        await db.insert(users).values({
            email,
            name,
            phone,
            password: hashedPassword,
        });

        return { success: true };
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        throw new Error("Erro ao criar usuário. Tente novamente mais tarde.");
    }
}
