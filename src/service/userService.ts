import { UserRepository } from '../repository/userRepository.js';
import type { User } from '../model/user.js';

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async getUserProfile(userId: string): Promise<User> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('Usuário não encontrado no sistema.');
        }
        return user;
    }

    async processCorrectAnswer(userId: string): Promise<{ currentXp: number; unlockedLevel: number; levelUp: boolean }> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
        throw new Error('Usuário não encontrado.');
        }

        const XP_PER_CORRECT_ANSWER = 10;
        const XP_THRESHOLD_PER_LEVEL = 100; 
        const newXp = user.current_xp + XP_PER_CORRECT_ANSWER;
        let newLevel = user.unlocked_level;
        let levelUp = false;
        const expectedLevel = Math.floor(newXp / XP_THRESHOLD_PER_LEVEL) + 1;

        if (expectedLevel > user.unlocked_level) {
            newLevel = expectedLevel;
            levelUp = true;
        }

        await this.userRepository.updateProgress(userId, newXp, newLevel);
        return {
            currentXp: newXp,
            unlockedLevel: newLevel,
            levelUp
        };
    }
}