import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { userRepository, } from "../repositories/user.repository.js";
import { AppError } from "../utils/AppError.js";
export class AuthService {
    saltRounds = 12;
    async register(name, email, password) {
        const normalizedEmail = email.toLowerCase().trim();
        const existingUser = await userRepository.findUserByEmail(normalizedEmail);
        if (existingUser) {
            throw AppError.conflict("Email already registered");
        }
        const passwordHash = await bcrypt.hash(password, this.saltRounds);
        const userId = uuidv4();
        const user = await userRepository.createUser(userId, name, normalizedEmail, passwordHash);
        const developerId = uuidv4();
        await userRepository.createDeveloperProfile(developerId, userId, name, normalizedEmail);
        const accessToken = this.generateToken(user.id);
        return {
            accessToken,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        };
    }
    async login(email, password) {
        const normalizedEmail = email.toLowerCase().trim();
        const user = await userRepository.findUserByEmail(normalizedEmail);
        if (!user) {
            throw AppError.unauthorized();
        }
        if (!user.isActive) {
            throw AppError.unauthorized();
        }
        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) {
            throw AppError.unauthorized();
        }
        const accessToken = this.generateToken(user.id);
        return {
            accessToken,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        };
    }
    async getMe(userId) {
        const user = await userRepository.findUserById(userId);
        if (!user) {
            throw AppError.notFound("User not found");
        }
        const developer = await userRepository.findDeveloperByUserId(userId);
        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
            developer,
        };
    }
    generateToken(userId) {
        const options = {
            expiresIn: (env.JWT_EXPIRES_IN || "1d"),
        };
        return jwt.sign({ sub: userId }, env.JWT_SECRET, options);
    }
    verifyToken(token) {
        return jwt.verify(token, env.JWT_SECRET);
    }
}
export const authService = new AuthService();
//# sourceMappingURL=auth.service.js.map