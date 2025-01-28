"use server";

import "dotenv/config";

import { signIn } from "@/lib/auth";

export default async function RegisterAction(formData: FormData) {
    const entries = Array.from(formData.entries());
    const data = Object.fromEntries(entries);

    if (!data.email || !data.name || !data.password || !data.phone) {
        throw new Error(
            "Não foi possivel fazer o cadastro, tente novamente mais tarde!"
        );
    }

    await signIn("credentials", data);
}
