import type { User } from '../model/user.js';
export declare class UserService {
    private userRepository;
    constructor();
    getUserProfile(userId: string): Promise<User>;
    processCorrectAnswer(userId: string): Promise<{
        currentXp: number;
        unlockedLevel: number;
        levelUp: boolean;
    }>;
}
//# sourceMappingURL=userService.d.ts.map