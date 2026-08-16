import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import {
  userRepository,
  type UserRecord,
  type DeveloperRecord,
} from "../repositories/user.repository.js";
import { AppError } from "../utils/AppError.js";

export interface RegisterResult {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export class AuthService {
  private readonly saltRounds = 12;

  async register(
    name: string,
    email: string,
    password: string,
  ): Promise<RegisterResult> {
    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await userRepository.findUserByEmail(normalizedEmail);
    if (existingUser) {
      throw AppError.conflict("Email already registered");
    }

    const passwordHash = await bcrypt.hash(password, this.saltRounds);
    const userId = uuidv4();

    const user = await userRepository.createUser(
      userId,
      name,
      normalizedEmail,
      passwordHash,
    );

    const developerId = uuidv4();
    await userRepository.createDeveloperProfile(
      userId,
      developerId,
      name,
      normalizedEmail,
    );

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

  async login(email: string, password: string): Promise<RegisterResult> {
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

  async getMe(userId: string): Promise<{
    user: { id: string; email: string; name: string };
    developer: DeveloperRecord | null;
  }> {
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

  private generateToken(userId: string): string {
    const options: jwt.SignOptions = { expiresIn: env.JWT_EXPIRES_IN as NonNullable<jwt.SignOptions["expiresIn"]> };
    return jwt.sign({ sub: userId }, env.JWT_SECRET, options);
  }

  verifyToken(token: string): { sub: string; iat: number; exp: number } {
    return jwt.verify(token, env.JWT_SECRET) as {
      sub: string;
      iat: number;
      exp: number;
    };
  }
}

export const authService = new AuthService();
