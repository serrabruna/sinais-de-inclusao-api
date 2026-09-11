import { UserRepository } from '../repository/userRepository.js';
import type { User } from '../model/user.js';

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async getUserProfile(userId: string) {
        const user = await this.userRepository.findProfileWithEmail(userId);
        if (!user) throw new Error('Usuário não encontrado.');

        
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        let ativoHoje = false;
        let streakExibicao = user.streak_count || 0;

        if (user.last_streak_date) {
        const ultimaData = new Date(user.last_streak_date);
        ultimaData.setHours(0, 0, 0, 0);

        const diffDias = Math.floor((hoje.getTime() - ultimaData.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDias === 0) {
            ativoHoje = true;
        } else if (diffDias > 1) {
            streakExibicao = 0; 
        }
        }

        return {
        id: user.id,
        name: user.name,
        email: user.email || '',
        xp: user.current_xp,
        unlockedLevel: user.unlocked_level,
        icon: user.avatar_icon || 'default_avatar',
        streak: streakExibicao,
        streakActiveToday: ativoHoje,
        };
    }

    async processCorrectAnswer(userId: string) {
        const user = await this.userRepository.findById(userId);
        if (!user) throw new Error('Usuário não encontrado.');

        const XP_PER_CORRECT_ANSWER = 10;
        const XP_THRESHOLD_PER_LEVEL = 100;

        const newXp = (user.current_xp || 0) + XP_PER_CORRECT_ANSWER;
        const newLevel = Math.floor(newXp / XP_THRESHOLD_PER_LEVEL) + 1;
        const levelUp = newLevel > user.unlocked_level;

        await this.userRepository.updateProgress(userId, newXp, newLevel);

        const streakData = await this.registerDailyStreak(userId);

        return {
        currentXp: newXp,
        unlockedLevel: newLevel,
        levelUp,
        streak: streakData.streak
        };
    }

    async registerDailyStreak(userId?: string) {
        if (!userId) {
            throw new Error('ID do usuário é obrigatório e não pode ser indefinido.');
        }

        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('Usuário não encontrado.');
        }

        const agora = new Date();
        const partesData = agora.toISOString().split('T');
        const hojeStr: string = partesData[0]!; 

        let novoStreak: number = 1;

        if (user.last_streak_date) {
            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);

            const ultimaData = new Date(user.last_streak_date);
            ultimaData.setHours(0, 0, 0, 0);

            const diffDias = Math.floor((hoje.getTime() - ultimaData.getTime()) / (1000 * 60 * 60 * 24));

            if (diffDias === 0) {
                return { streak: user.streak_count, activeToday: true };
            } else if (diffDias === 1) {
                novoStreak = (user.streak_count || 0) + 1;
            }
        }

        await this.userRepository.updateStreak(userId, novoStreak, hojeStr);

        return { streak: novoStreak, activeToday: true };
    }

    async updateUserName(userId: string, name: string) {
        if (!userId) throw new Error('ID do usuário não fornecido.');
        if (!name || name.trim().length === 0) {
            throw new Error('O nome não pode ser vazio.');
        }

        await this.userRepository.updateName(userId, name.trim());
        return { message: 'Nome atualizado com sucesso!', name: name.trim() };
    }

    async deleteUserAccount(userId: string) {
        if (!userId) throw new Error('ID do usuário não fornecido.');
        await this.userRepository.deleteAccount(userId);
        return { message: 'Conta excluída com sucesso!' };
    }

}