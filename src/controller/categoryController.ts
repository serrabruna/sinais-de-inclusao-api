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

    async handleCreateCategory(req: Request, res: Response) {
        try {
            const { name, order, description } = req.body;
            const newCategory = await categoryService.createCategory({ name, order, description });
            return res.status(201).json(newCategory);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    async handleGetCategoryById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const category = await categoryService.getById(id);
            return res.json(category);
        } catch (error: any) {
            if (error.message === "Categoria não encontrada.") {
                return res.status(404).json({ error: error.message });
            }
            return res.status(400).json({ error: error.message });
        }
    }

    async handleUpdateCategory(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "ID inválido." });
        const updatedCategory = await categoryService.updateCategory(id, req.body);
        return res.json(updatedCategory);
    } catch (error: any) {
        if (error.message === "Categoria não encontrada.") {
            return res.status(404).json({ error: error.message });
        }
        return res.status(400).json({ error: error.message });
    }
}

    async handleDeleteCategory(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            await categoryService.deleteCategory(id);
            return res.status(204).send(); 
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}