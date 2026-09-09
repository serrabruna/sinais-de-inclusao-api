import type { User } from '../model/user.js';
export declare class UserRepository {
    findById(id: string): Promise<User | null>;
    createProfile(id: string, name: string, role?: string): Promise<User | null>;
    updateProgress(id: string, newXp: number, newLevel: number): Promise<void>;
}
//# sourceMappingURL=userRepository.d.ts.map