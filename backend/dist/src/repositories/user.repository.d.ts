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
export declare class UserRepository {
    createUser(id: string, name: string, email: string, passwordHash: string): Promise<UserRecord>;
    findUserByEmail(email: string): Promise<UserRecord | null>;
    findUserById(id: string): Promise<UserRecord | null>;
    createDeveloperProfile(userId: string, id: string, name: string, email: string, location?: string, experienceYears?: number, headline?: string): Promise<DeveloperRecord>;
    findDeveloperByUserId(userId: string): Promise<DeveloperRecord | null>;
}
export declare const userRepository: UserRepository;
//# sourceMappingURL=user.repository.d.ts.map