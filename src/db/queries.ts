import { eq } from "drizzle-orm";
import { db } from ".";
import { users } from "./schema";

export async function getUser(email: string) {
    const user = await db.query.users.findFirst({
        where: eq(users.email, email),
    });

    return user;
}
