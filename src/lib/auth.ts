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
        const { email, name, password, phone } = await signInSchema.parseAsync(
          credentials
        );

        return {
          name: "ola",
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
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
});
