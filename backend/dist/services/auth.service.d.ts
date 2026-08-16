import { type DeveloperRecord } from "../repositories/user.repository.js";
export interface RegisterResult {
    accessToken: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
}
export declare class AuthService {
    private readonly saltRounds;
    register(name: string, email: string, password: string): Promise<RegisterResult>;
    login(email: string, password: string): Promise<RegisterResult>;
    getMe(userId: string): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
        };
        developer: DeveloperRecord | null;
    }>;
    private generateToken;
    verifyToken(token: string): {
        sub: string;
        iat: number;
        exp: number;
    };
}
export declare const authService: AuthService;
//# sourceMappingURL=auth.service.d.ts.map