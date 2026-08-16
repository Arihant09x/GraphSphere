import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { getSession } from "../db/driver.js";
import { recordToObject } from "../db/driver.js";
import { AppError } from "../utils/AppError.js";
export async function authMiddleware(req, _res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        next(AppError.unauthorized("Missing or invalid authorization header"));
        return;
    }
    const token = authHeader.slice(7);
    try {
        const decoded = jwt.verify(token, env.JWT_SECRET);
        const session = getSession();
        try {
            const result = await session.run("MATCH (u:User {id: $id, isActive: true}) RETURN u", { id: decoded.sub });
            if (result.records.length === 0) {
                next(AppError.unauthorized("User not found or inactive"));
                return;
            }
            const userRecord = result.records[0].get("u");
            const user = recordToObject(userRecord);
            req.user = user;
            next();
        }
        finally {
            await session.close();
        }
    }
    catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            next(AppError.unauthorized("Token expired"));
            return;
        }
        if (error instanceof jwt.JsonWebTokenError) {
            next(AppError.unauthorized("Invalid token"));
            return;
        }
        next(AppError.unauthorized("Authentication failed"));
    }
}
//# sourceMappingURL=auth.js.map