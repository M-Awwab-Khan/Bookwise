import { drizzle } from "drizzle-orm/postgres-js";
import  postgres  from "postgres";
import { config } from "@/lib/config";


const connectionString = config.env.databaseURL;
const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client);

