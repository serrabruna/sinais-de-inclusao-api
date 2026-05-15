import type { Request, Response } from 'express';
import { UserService } from '../service/userService.js';

const userService = new UserService();

export const handleAnswerResponse = async (req: Request, res: Response) => {
    try {
        const { isCorrect } = req.body;
        const userId = req.userId; 

        if (!isCorrect) {
        return res.json({ message: "Resposta incorreta. Tente novamente!", levelUp: false });
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