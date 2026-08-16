import "dotenv/config";
import { createApp } from "./app.js";
import { closeDriver } from "./db/driver.js";
import { env } from "./config/env.js";
import { logger } from "./config/logger.js";
const server = createApp().listen(env.PORT, () => {
    logger.info({ port: env.PORT }, "GraphSphere API listening");
});
async function shutdown() {
    logger.info("Received shutdown signal");
    server.close(async () => {
        await closeDriver();
        logger.info("HTTP server and Neo4j driver closed");
        process.exit(0);
    });
}
process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);
//# sourceMappingURL=server.js.map