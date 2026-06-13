import type { Request, Response } from 'express';
import { SignService } from '../service/signService.js';

const signService = new SignService();

export class SignController {
    async handleCreateSign(req: Request, res: Response) {
        try {
            const { categoryId, name, statement, imagePath, correctAnswer, options } = req.body;
            if (!categoryId || !name || !statement || !correctAnswer || !options) {
                return res.status(400).json({ 
                    error: "Os campos 'categoryId', 'name', 'statement', 'correctAnswer' e 'options' são obrigatórios." 
                });
            }

            const newSign = await signService.createSign({
                categoryId: Number(categoryId),
                name,
                statement,
                imagePath: imagePath || '',
                correctAnswer,
                options
            });

            return res.status(201).json(newSign);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

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

    async handleUpdateSign(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const updatedSign = await signService.updateSign(id, req.body);
            return res.json(updatedSign);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    async handleDeleteSign(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            await signService.deleteSign(id);
            return res.status(204).send();
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    async handleListAllSigns(req: Request, res: Response) {
        try {
            const signs = await signService.listAllSigns();
            return res.json(signs);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}