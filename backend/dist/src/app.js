import express from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { env } from "./config/env.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { requestIdMiddleware } from "./middleware/requestId.js";
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
    const openapi = swaggerJSDoc({
        definition: {
            openapi: "3.0.3",
            info: { title: "GraphSphere API", version: "1.0.0" },
            components: {
                securitySchemes: {
                    bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
                },
            },
            paths: {
                "/api/v1/health": {
                    get: {
                        summary: "Database health check",
                        responses: {
                            "200": { description: "Healthy" },
                            "503": { description: "Database unavailable" },
                        },
                    },
                },
                "/api/v1/auth/register": {
                    post: {
                        summary: "Register",
                        requestBody: { required: true },
                        responses: { "201": { description: "Created" } },
                    },
                },
                "/api/v1/auth/login": {
                    post: {
                        summary: "Login",
                        responses: { "200": { description: "JWT issued" } },
                    },
                },
                "/api/v1/auth/me": {
                    get: {
                        security: [{ bearerAuth: [] }],
                        responses: { "200": { description: "Current user" } },
                    },
                },
                "/api/v1/developers": {
                    get: {
                        security: [{ bearerAuth: [] }],
                        responses: { "200": { description: "Developers" } },
                    },
                },
                "/api/v1/developers/{id}": {
                    get: {
                        security: [{ bearerAuth: [] }],
                        parameters: [{ name: "id", in: "path", required: true }],
                        responses: { "200": { description: "Developer" } },
                    },
                },
                "/api/v1/projects": {
                    get: {
                        security: [{ bearerAuth: [] }],
                        responses: { "200": { description: "Projects" } },
                    },
                },
                "/api/v1/projects/{id}": {
                    get: {
                        security: [{ bearerAuth: [] }],
                        parameters: [{ name: "id", in: "path", required: true }],
                        responses: { "200": { description: "Project" } },
                    },
                },
                "/api/v1/technologies": {
                    get: {
                        security: [{ bearerAuth: [] }],
                        responses: { "200": { description: "Technologies" } },
                    },
                },
                "/api/v1/technologies/{id}": {
                    get: {
                        security: [{ bearerAuth: [] }],
                        parameters: [{ name: "id", in: "path", required: true }],
                        responses: { "200": { description: "Technology" } },
                    },
                },
                "/api/v1/search": {
                    get: {
                        security: [{ bearerAuth: [] }],
                        parameters: [{ name: "q", in: "query", required: true }],
                        responses: { "200": { description: "Search results" } },
                    },
                },
                "/api/v1/graph/path": {
                    get: {
                        security: [{ bearerAuth: [] }],
                        parameters: [
                            { name: "fromId", in: "query", required: true },
                            { name: "toId", in: "query", required: true },
                        ],
                        responses: { "200": { description: "Shortest graph path" } },
                    },
                },
                "/api/v1/graph/recommendations/{id}": {
                    get: {
                        security: [{ bearerAuth: [] }],
                        parameters: [{ name: "id", in: "path", required: true }],
                        responses: { "200": { description: "Graph recommendations" } },
                    },
                },
            },
        },
        apis: [],
    });
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapi));
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