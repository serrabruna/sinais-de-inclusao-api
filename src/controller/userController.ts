import type { Request, Response } from 'express';
import { UserService } from '../service/userService.js';
import { SignService } from '../service/signService.js'; 

const userService = new UserService();
const signService = new SignService(); 

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