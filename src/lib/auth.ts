import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";

import { getUser } from "@/db/queries";
import { loginSchema } from "./zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: DrizzleAdapter(db),
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                try {
                    const { email } = await loginSchema.parseAsync(credentials);
                    const user = await getUser(email);

                    if (!user) {
                        console.error("Usuário não encontrado.");
                        return null;
                    }

                    console.log(user);

                    return user;
                } catch (error) {
                    console.error("Erro na autenticação:", error);
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/login",
    },
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
});
