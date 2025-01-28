import { auth } from "@/lib/auth";
import { db } from ".";
import { users } from "./schema";

export const getUserIdOrThrow = async () => {
    const sessions = await auth();

    const userId = sessions?.user?.id;

    if (!userId) throw new Error("Usuário não encontrado");

    return userId;
};

export const createUser = async ({
    email,
    name,
    password,
    phone,
}: UserData) => {
    const newUser = await db
        .insert(users)
        .values({
            name,
            email,
            password,
            phone,
        })
        .returning()
        .then(([user]) => user);

    return newUser;
};
