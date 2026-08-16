import { getSession, recordToObject, toNumber } from "../db/driver.js";
import { authQueries } from "../queries/auth.js";
import type { AuthenticatedRequest } from "../middleware/auth.js";
import { AppError } from "../utils/AppError.js";

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  isActive: boolean;
  createdAt: string;
}

export interface DeveloperRecord {
  id: string;
  name: string;
  email: string;
  location?: string;
  experienceYears?: number;
  headline?: string;
}

export class UserRepository {
  async createUser(
    id: string,
    name: string,
    email: string,
    passwordHash: string,
  ): Promise<UserRecord> {
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

      return recordToObject(result.records[0]!.get("u")) as unknown as UserRecord;
    } finally {
      await session.close();
    }
  }

  async findUserByEmail(email: string): Promise<UserRecord | null> {
    const session = getSession();
    try {
      const normalizedEmail = email.toLowerCase().trim();
      const result = await session.run(authQueries.findUserByEmail, {
        email: normalizedEmail,
      });

      if (result.records.length === 0) {
        return null;
      }

      return recordToObject(result.records[0]!.get("u")) as unknown as UserRecord;
    } finally {
      await session.close();
    }
  }

  async findUserById(id: string): Promise<UserRecord | null> {
    const session = getSession();
    try {
      const result = await session.run(authQueries.findUserById, { id });

      if (result.records.length === 0) {
        return null;
      }

      return recordToObject(result.records[0]!.get("u")) as unknown as UserRecord;
    } finally {
      await session.close();
    }
  }

  async createDeveloperProfile(
    userId: string,
    id: string,
    name: string,
    email: string,
    location: string = "",
    experienceYears: number = 0,
    headline: string = "",
  ): Promise<DeveloperRecord> {
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

      return recordToObject(result.records[0]!.get("d")) as unknown as DeveloperRecord;
    } finally {
      await session.close();
    }
  }

  async findDeveloperByUserId(userId: string): Promise<DeveloperRecord | null> {
    const session = getSession();
    try {
      const result = await session.run(authQueries.findDeveloperByUserId, {
        userId,
      });

      if (result.records.length === 0) {
        return null;
      }

      return recordToObject(result.records[0]!.get("d")) as unknown as DeveloperRecord;
    } finally {
      await session.close();
    }
  }
}

export const userRepository = new UserRepository();
