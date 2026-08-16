import { verifyConnection } from "./driver.js";
export async function checkDatabaseHealth() {
    try {
        const connected = await verifyConnection();
        return connected
            ? { status: "healthy" }
            : { status: "unhealthy", details: "Connection verification failed" };
    }
    catch (error) {
        return {
            status: "unhealthy",
            details: error instanceof Error ? error.message : "Unknown error",
        };
    }
}
//# sourceMappingURL=health.js.map