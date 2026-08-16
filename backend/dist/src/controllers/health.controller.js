import { checkDatabaseHealth } from "../db/health.js";
import { AppError } from "../utils/AppError.js";
export const healthController = {
    async check(_req, res) {
        const dbHealth = await checkDatabaseHealth();
        if (dbHealth.status === "unhealthy") {
            throw AppError.serviceUnavailable(`Database unavailable: ${dbHealth.details}`);
        }
        res.json({
            status: "healthy",
            database: "healthy",
        });
    },
};
//# sourceMappingURL=health.controller.js.map