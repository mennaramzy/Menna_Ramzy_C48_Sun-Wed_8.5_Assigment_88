import dotenv from "dotenv";

dotenv.config({ path: ".env.dev" });

export const { PORT, DB_URI, JWT_SECRET, SALT_ROUNDS } = process.env;