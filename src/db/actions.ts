"use server";

import { auth } from "@/lib/auth";
import { db } from ".";
import { users } from "./schema";
import bcrypt from "bcryptjs";
import { saltAndHashPassword } from "@/lib/utils";
import { eq } from "drizzle-orm";

export const getUserIdOrThrow = async () => {
  const sessions = await auth();

  const userId = sessions?.user?.id;

  if (!userId) throw new Error("Usuário não encontrado");

  return userId;
};

export async function createUser(formData: UserData) {
  try {
    const { email, name, phone, password } = formData;

    if (!email || !name || !phone || !password) {
      throw new Error("Todos os campos são obrigatórios.");
    }

    const hashedPassword = await saltAndHashPassword(password);

    const existedUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existedUser) {
      throw new Error("Usuário já existe, entre com conta ou mude de senha!");
    }

    await db.insert(users).values({
      email,
      name,
      phone,
      password: hashedPassword,
    });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw new Error("Erro ao criar usuário. Tente novamente mais tarde.");
  }
}
