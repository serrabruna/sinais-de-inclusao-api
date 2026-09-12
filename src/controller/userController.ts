import type { Request, Response } from 'express';
import { UserService } from '../service/userService.js';
import { SignService } from '../service/signService.js'; 

const userService = new UserService();
const signService = new SignService(); 

export const handleAnswerResponse = async (req: Request, res: Response) => {
    try {
        const { sign_id, user_answer } = req.body;
        const userId = req.userId || (req as any).user?.id;
        
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
        const userId = req.userId || (req as any).user?.id;
        if (!userId) return res.status(401).json({ error: "Não autenticado." });

        const user = await userService.getUserProfile(userId);
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        return res.status(200).json({ xp: user.xp });
    } catch (error: any) {
        return res.status(500).json({ message: "Erro ao buscar XP." });
    }
};

export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.userId || (req as any).user?.id;
        const userEmail = req.userEmail || (req as any).user?.email || '';

        if (!userId) return res.status(401).json({ error: "Não autenticado." });

        
        const profile = await userService.getUserProfile(userId, userEmail);
        return res.status(200).json(profile);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export const postStreak = async (req: Request, res: Response) => {
    try {
        const userId = req.userId || (req as any).user?.id;
        if (!userId) return res.status(401).json({ error: "Não autenticado." });

        const result = await userService.registerDailyStreak(userId);
        return res.status(200).json(result);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.userId || (req as any).user?.id;
        const { name, icon } = req.body;

        if (!userId) return res.status(401).json({ error: 'Não autenticado.' });

        if (!name && !icon) {
            return res.status(400).json({ error: "É necessário informar ao menos 'name' ou 'icon'." });
        }

        const result = await userService.updateUserProfile(userId, { name, icon });
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