import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import { signInSchema } from "./zod";
import { createUser } from "@/db/actions";
import { saltAndHashPassword } from "./utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: DrizzleAdapter(db),
    providers: [
        Credentials({
            credentials: {
                name: {},
                email: {},
                phone: {},
                password: {},
            },
            authorize: async (credentials) => {
                const { email, name, password, phone } =
                    await signInSchema.parseAsync(credentials);

                const pwHash = await saltAndHashPassword(password);

                const newUser = await createUser({
                    email,
                    name,
                    password: pwHash,
                    phone,
                });

                return {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    phone: newUser.phone,
                    password: newUser.password,
                };
            },
        }),
    ],
    pages: {
        signIn: "auth/register",
    },
});
