import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { requestIdMiddleware } from "./middleware/rate-limit.js";
import { generalRateLimiter } from "./middleware/rate-limit.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFoundHandler } from "./middleware/notFound.js";
import { healthRoutes } from "./routes/health.routes.js";
import { authRoutes } from "./routes/auth.routes.js";
import { developerRoutes } from "./routes/developer.routes.js";
import { projectRoutes } from "./routes/project.routes.js";
import { technologyRoutes } from "./routes/technology.routes.js";
import { graphRoutes } from "./routes/graph.routes.js";
import { searchRoutes } from "./routes/search.routes.js";
export function createApp() {
    const app = express();
    app.use(helmet());
    app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
    app.use(express.json());
    app.use(requestIdMiddleware);
    app.use(requestLogger);
    app.use(generalRateLimiter);
    app.use("/api/v1/health", healthRoutes);
    app.use("/api/v1/auth", authRoutes);
    app.use("/api/v1/developers", developerRoutes);
    app.use("/api/v1/projects", projectRoutes);
    app.use("/api/v1/technologies", technologyRoutes);
    app.use("/api/v1/graph", graphRoutes);
    app.use("/api/v1/search", searchRoutes);
    app.use(notFoundHandler);
    app.use(errorHandler);
    return app;
}
//# sourceMappingURL=app.js.map