import "dotenv/config";

import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!);
const db = drizzle(sql);

const main = async () => {
    try {
        await migrate(db, { migrationsFolder: "./src/drizzle" });
        console.log("Migration completed");
    } catch (error) {
        console.error("Error during migrate: ", error);
        process.exit(1);
    }
};

main();
