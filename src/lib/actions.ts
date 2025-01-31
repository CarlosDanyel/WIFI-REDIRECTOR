"use server";

import { signIn } from "@/lib/auth";

export async function authenticate(userData: UserData) {
    const result = await signIn("credentials", {
        email: userData.email,
        password: userData.password,
        redirectTo: "/sucess/approved",
    });

    return result;
}
