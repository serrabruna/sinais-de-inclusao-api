import type { Request, Response } from 'express';
import { SignService } from '../service/signService.js';
import { createClient } from '@supabase/supabase-js';
import { getSupabase } from '../config/supabase.js';

const signService = new SignService();
const supabase = getSupabase();

const sanitizeFileName = (name: string) => {
    return name.replace(/\s+/g, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export class SignController {
    async handleCreateSign(req: Request, res: Response) {
        try {
            const { categoryId, name, statement, correctAnswer, options } = req.body;
            const manualImagePath = req.body.imagePath ?? req.body.image_path;
            const file = req.file; 

            if (!categoryId || !name || !statement || !correctAnswer || !options) {
                return res.status(400).json({ 
                    error: "Os campos 'categoryId', 'name', 'statement', 'correctAnswer' e 'options' são obrigatórios." 
                });
            }

            let imagePath = manualImagePath || '';
            
            if (file) {
                const fileName = `${Date.now()}_${file.originalname}`;
                const { data, error } = await supabase.storage
                    .from('sinais') 
                    .upload(fileName, file.buffer, { contentType: file.mimetype });

                if (error) throw new Error("Erro ao subir imagem: " + error.message);

                const { data: publicUrlData } = supabase.storage
                    .from('sinais')
                    .getPublicUrl(fileName);
                
                imagePath = publicUrlData.publicUrl; 
            }

            const newSign = await signService.createSign({
                categoryId: Number(categoryId),
                name,
                statement,
                imagePath,
                correctAnswer,
                options: typeof options === 'string' ? JSON.parse(options) : options
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
            if (isNaN(id)) return res.status(400).json({ error: "ID inválido." });

            const body = req.body;
            const normalizedData = {
                ...body,
                imagePath: body.imagePath ?? body.image_path,
                categoryId: body.categoryId ?? body.category_id,
                correctAnswer: body.correctAnswer ?? body.correct_answer,
            };

            const updatedSign = await signService.updateSign(id, normalizedData);
            return res.json(updatedSign);
        } catch (error: any) {
            if (error.message === "Sinal não encontrado.") {
                return res.status(404).json({ error: error.message });
            }
            return res.status(400).json({ error: error.message });
        }
    }

    async handleDeleteSign(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) return res.status(400).json({ error: "ID inválido." });
            await signService.deleteSign(id);
            return res.status(200).json({ message: "Sinal deletado com sucesso!" });
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