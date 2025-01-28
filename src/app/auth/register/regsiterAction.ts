"use server";

import "dotenv/config";

import { signIn } from "@/lib/auth";

export default async function RegisterAction(formData: FormData) {
    try {
        await signIn("credentials", {
            email: formData.get("email") as string,
            name: formData.get("name") as string,
            password: formData.get("password") as string,
            phone: formData.get("phone") as string,
            redirect: false,
        });
    } catch (error) {
        console.error(error);
    }
}
