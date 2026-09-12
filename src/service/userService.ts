import { UserRepository } from '../repository/userRepository.js';

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    private async buildWeeklyActivity(userId: string): Promise<Array<{ date: string; completed: boolean }>> {
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        const diaSemana = hoje.getDay();
        const diasAteSegunda = diaSemana === 0 ? 6 : diaSemana - 1;

        const segundaFeira = new Date(hoje);
        segundaFeira.setDate(hoje.getDate() - diasAteSegunda);
        segundaFeira.setHours(0, 0, 0, 0);

        const inicioSemanaStr = segundaFeira.toISOString().split('T')[0]!;
        const datasConcluidas = await this.userRepository.getRecentActivityDates(userId, inicioSemanaStr);

        const weeklyActivity: Array<{ date: string; completed: boolean }> = [];
        const ponteiro = new Date(segundaFeira);
        
        while (ponteiro <= hoje) {
            const dataStr = ponteiro.toISOString().split('T')[0]!;
            weeklyActivity.push({
                date: dataStr,
                completed: datasConcluidas.includes(dataStr)
            });
            ponteiro.setDate(ponteiro.getDate() + 1);
        }

        return weeklyActivity;
    }

    async getUserProfile(userId: string, emailFallback: string = '') {
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
            email: user.email || emailFallback,
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
            streak: streakData.streak,
            weeklyActivity: streakData.weeklyActivity
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
        const hojeStr = agora.toISOString().split('T')[0]!;

        let novoStreak: number = 1;
        let jaTreinouHoje = false;

        if (user.last_streak_date) {
            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);

            const ultimaData = new Date(user.last_streak_date);
            ultimaData.setHours(0, 0, 0, 0);

            const diffDias = Math.floor((hoje.getTime() - ultimaData.getTime()) / (1000 * 60 * 60 * 24));

            if (diffDias === 0) {
                jaTreinouHoje = true;
                novoStreak = user.streak_count || 1;
            } else if (diffDias === 1) {
                novoStreak = (user.streak_count || 0) + 1;
            }
        }

        if (!jaTreinouHoje || user.last_streak_date !== hojeStr) {
            await this.userRepository.updateStreak(userId, novoStreak, hojeStr);
            await this.userRepository.logDailyActivity(userId, hojeStr);
        }

        const weeklyActivity = await this.buildWeeklyActivity(userId);

        return {
            xp: user.current_xp || 0,
            streak: novoStreak,
            streakActiveToday: true,
            weeklyActivity
        };
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