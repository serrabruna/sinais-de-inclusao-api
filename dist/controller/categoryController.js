import { CategoryService } from '../service/categoryService.js';
const categoryService = new CategoryService();
export class CategoryController {
    async handleListCategories(req, res) {
        try {
            const categories = await categoryService.listAll();
            return res.json(categories);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async handleCreateCategory(req, res) {
        try {
            const { name, order, description } = req.body;
            const newCategory = await categoryService.createCategory({ name, order, description });
            return res.status(201).json(newCategory);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async handleGetCategoryById(req, res) {
        try {
            const id = Number(req.params.id);
            const category = await categoryService.getById(id);
            return res.json(category);
        }
        catch (error) {
            if (error.message === "Categoria não encontrada.") {
                return res.status(404).json({ error: error.message });
            }
            return res.status(400).json({ error: error.message });
        }
    }
    async handleUpdateCategory(req, res) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id))
                return res.status(400).json({ error: "ID inválido." });
            const updatedCategory = await categoryService.updateCategory(id, req.body);
            return res.json(updatedCategory);
        }
        catch (error) {
            if (error.message === "Categoria não encontrada.") {
                return res.status(404).json({ error: error.message });
            }
            return res.status(400).json({ error: error.message });
        }
    }
    async handleDeleteCategory(req, res) {
        try {
            const id = Number(req.params.id);
            await categoryService.deleteCategory(id);
            return res.status(200).json({ message: "Categoria deletada com sucesso!" });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
//# sourceMappingURL=categoryController.js.map