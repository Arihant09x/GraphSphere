import { getSession, recordToObject, toNumber } from "../db/driver.js";
import { authQueries } from "../queries/auth.js";
import { AppError } from "../utils/AppError.js";
export class UserRepository {
    async createUser(id, name, email, passwordHash) {
        const session = getSession();
        try {
            const result = await session.run(authQueries.createUser, {
                id,
                name,
                email,
                passwordHash,
            });
            if (result.records.length === 0) {
                throw AppError.internal("Failed to create user");
            }
            return recordToObject(result.records[0].get("u"));
        }
        finally {
            await session.close();
        }
    }
    async findUserByEmail(email) {
        const session = getSession();
        try {
            const normalizedEmail = email.toLowerCase().trim();
            const result = await session.run(authQueries.findUserByEmail, {
                email: normalizedEmail,
            });
            if (result.records.length === 0) {
                return null;
            }
            return recordToObject(result.records[0].get("u"));
        }
        finally {
            await session.close();
        }
    }
    async findUserById(id) {
        const session = getSession();
        try {
            const result = await session.run(authQueries.findUserById, { id });
            if (result.records.length === 0) {
                return null;
            }
            return recordToObject(result.records[0].get("u"));
        }
        finally {
            await session.close();
        }
    }
    async createDeveloperProfile(userId, id, name, email, location = "", experienceYears = 0, headline = "") {
        const session = getSession();
        try {
            const result = await session.run(authQueries.createDeveloperProfile, {
                userId,
                id,
                name,
                email,
                location,
                experienceYears,
                headline,
            });
            if (result.records.length === 0) {
                throw AppError.internal("Failed to create developer profile");
            }
            return recordToObject(result.records[0].get("d"));
        }
        finally {
            await session.close();
        }
    }
    async findDeveloperByUserId(userId) {
        const session = getSession();
        try {
            const result = await session.run(authQueries.findDeveloperByUserId, {
                userId,
            });
            if (result.records.length === 0) {
                return null;
            }
            return recordToObject(result.records[0].get("d"));
        }
        finally {
            await session.close();
        }
    }
}
export const userRepository = new UserRepository();
//# sourceMappingURL=user.repository.js.map