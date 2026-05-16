import type { Request, Response } from 'express';
import { SignService } from '../service/signService.js';

const signService = new SignService();

export class SignController {
    async handleListCategories(req: Request, res: Response) {
        try {
        const categories = await signService.listCategories();
        return res.json(categories);
        } catch (error: any) {
        return res.status(400).json({ error: error.message });
        }
    }

    async handleGetQuestions(req: Request, res: Response) {
        try {
        
        const categoryId = Number(req.params.id);

        if (isNaN(categoryId)) {
            return res.status(400).json({ error: "ID da categoria inválido." });
        }

        
        const questions = await signService.getQuestionsByCategory(categoryId);
        
        return res.json(questions);
        } catch (error: any) {
        
        return res.status(404).json({ error: error.message });
        }
    }
}