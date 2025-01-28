import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import { signInSchema } from "./zod";
import { createUser } from "@/db/actions";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: DrizzleAdapter(db),
    providers: [
        Credentials({
            credentials: {
                name: { label: "Name", type: "text" },
                email: { label: "Email", type: "email" },
                phone: { label: "Phone", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                console.log("Credentials recebidos:", credentials);
                const { email, name, password, phone } =
                    await signInSchema.parseAsync(credentials);

                const newUser = await createUser({
                    email,
                    name,
                    password,
                    phone,
                });

                return {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    phone: newUser.phone,
                };
            },
        }),
    ],
    pages: {
        signIn: "auth/register",
    },
    callbacks: {
        authorized: async ({ auth }) => {
            return !!auth;
        },
    },
});
