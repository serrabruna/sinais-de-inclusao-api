export declare class UserService {
    private userRepository;
    constructor();
    getUserProfile(userId: string): Promise<{
        id: string;
        name: string;
        email: string;
        xp: number;
        unlockedLevel: number;
        icon: string;
        streak: number;
        streakActiveToday: boolean;
    }>;
    processCorrectAnswer(userId: string): Promise<{
        currentXp: number;
        unlockedLevel: number;
        levelUp: boolean;
        streak: number;
    }>;
    registerDailyStreak(userId?: string): Promise<{
        streak: number;
        activeToday: boolean;
    }>;
}
//# sourceMappingURL=userService.d.ts.map