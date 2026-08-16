import "dotenv/config";
import { getSession, closeDriver } from "../src/db/driver.js";
if(process.env.CLEAR_GRAPH!=="true"){ console.error("Refusing to clear graph. Set CLEAR_GRAPH=true to confirm."); process.exitCode=1; }
else { const session=getSession(); try { await session.run("MATCH (n) DETACH DELETE n"); console.log("Graph cleared."); } finally { await session.close(); await closeDriver(); } }
