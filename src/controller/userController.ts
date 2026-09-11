import type { Request, Response } from 'express';
import { UserService } from '../service/userService.js';
import { SignService } from '../service/signService.js'; 
import { UserRepository } from '../repository/userRepository.js';

const userService = new UserService();
const signService = new SignService(); 
const userRepository = new UserRepository();

export const handleAnswerResponse = async (req: Request, res: Response) => {
    try {
        const { sign_id, user_answer } = req.body;
        const userId = req.userId;
        
        if (!userId) return res.status(401).json({ error: "Usuário não autenticado." });
        if (!sign_id || user_answer === undefined) {
            return res.status(400).json({ error: "Campos 'sign_id' e 'user_answer' são obrigatórios." });
        }

        const isCorrect = await signService.processAnswer(sign_id, user_answer);

        if (!isCorrect) {
            return res.json({ 
                message: "Resposta incorreta. Tente novamente!", 
                levelUp: false 
            });
        }

        const result = await userService.processCorrectAnswer(userId);

        return res.json({
            message: "Parabéns, você acertou!",
            xpGained: 10,
            totalXp: result.currentXp,
            currentLevel: result.unlockedLevel,
            levelUp: result.levelUp
        });
    } catch (error: any) {  
        return res.status(400).json({ error: error.message });
    }
};

export const getUserXp = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id; 
        const user = await userRepository.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
        return res.status(200).json({ xp: user.current_xp });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar XP" });
    }
};

export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.userId || (req as any).user?.id;
        if (!userId) return res.status(401).json({ error: "Não autenticado." });

        const profile = await userService.getUserProfile(userId);
        return res.status(200).json(profile);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export const postStreak = async (req: Request, res: Response) => {
    try {
        const userId = req.userId || (req as any).user?.id;
        if (!userId) return res.status(401).json({ error: "Não autenticado." });

        const streak = await userService.registerDailyStreak(userId);
        return res.status(200).json(streak);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export const updateProfileName = async (req: Request, res: Response) => {
    try {
        const userId = req.userId || (req as any).user?.id;
        const { name } = req.body;

        if (!userId) return res.status(401).json({ error: 'Não autenticado.' });
        if (!name) return res.status(400).json({ error: "O campo 'name' é obrigatório." });

        const result = await userService.updateUserName(userId, name);
        return res.status(200).json(result);
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
};

export const deleteAccount = async (req: Request, res: Response) => {
    try {
        const userId = req.userId || (req as any).user?.id;
        if (!userId) return res.status(401).json({ error: 'Não autenticado.' });

        const result = await userService.deleteUserAccount(userId);
        return res.status(200).json(result);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};
