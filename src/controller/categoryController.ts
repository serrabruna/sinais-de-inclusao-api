import type { Request, Response } from 'express';
import { CategoryService } from '../service/categoryService.js';

const categoryService = new CategoryService();

export class CategoryController {
    async handleListCategories(req: Request, res: Response) {
        try {
            const categories = await categoryService.listAll();
            return res.json(categories);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}