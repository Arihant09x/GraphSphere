import "dotenv/config";
import { readFile } from "node:fs/promises";
import { getSession, closeDriver } from "../src/db/driver.js";

const statements=(await readFile(new URL("./schema.cypher",import.meta.url),"utf8")).split(";").map(s=>s.trim()).filter(Boolean);
const session=getSession();
try { for(const statement of statements) await session.run(statement); console.log(`Schema applied (${statements.length} statements).`); }
finally { await session.close(); await closeDriver(); }
