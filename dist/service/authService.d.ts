export declare class AuthService {
    private userRepository;
    constructor();
    signUp(email: string, password: string, name: string, role?: string): Promise<{
        id: string;
        email: string | undefined;
    }>;
    signIn(email: string, password: string): Promise<{
        id: string;
        email: string | undefined;
        name: any;
        role: any;
        token: string;
    }>;
}
//# sourceMappingURL=authService.d.ts.map