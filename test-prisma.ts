import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL || "postgres://dummy:dummy@localhost/dummy";
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

try {
  const prisma = new PrismaClient({ adapter });
  console.log("Success");
} catch (e) {
  console.error("Failed:", e);
}
