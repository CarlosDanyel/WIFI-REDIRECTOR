import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import bcrypt from "bcryptjs";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const saltAndHashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const EncryptedPassword = await bcrypt.hash(password, salt);

    return EncryptedPassword;
};
