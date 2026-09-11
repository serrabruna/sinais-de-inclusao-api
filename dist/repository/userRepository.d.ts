import type { User } from '../model/user.js';
export declare class UserRepository {
    findById(id: string): Promise<User | null>;
    findProfileWithEmail(id: string): Promise<User | null>;
    createProfile(id: string, name: string, role?: string): Promise<User | null>;
    updateProgress(id: string, newXp: number, newLevel: number): Promise<void>;
    updateStreak(id: string, streakCount: number, streakDate: string): Promise<void>;
}
//# sourceMappingURL=userRepository.d.ts.map