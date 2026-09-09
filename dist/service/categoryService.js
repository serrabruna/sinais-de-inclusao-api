import { CategoryRepository } from "../repository/categoryRepository.js";
import { SignRepository } from "../repository/signRepository.js";
export class CategoryService {
    categoryRepository;
    signRepository = new SignRepository();
    constructor() {
        this.categoryRepository = new CategoryRepository();
    }
    async createCategory(data) {
        if (!data.name || !data.description) {
            throw new Error("Nome e descrição são obrigatórios.");
        }
        const sanitizedName = data.name.trim();
        if (!sanitizedName) {
            throw new Error("O nome da categoria não pode ser vazio.");
        }
        const alreadyExists = await this.categoryRepository.findByName(sanitizedName);
        if (alreadyExists) {
            throw new Error("Categoria com este nome já existe.");
        }
        return await this.categoryRepository.create(sanitizedName, data.description);
    }
    async listAll() {
        return await this.categoryRepository.findAll();
    }
    async getById(id) {
        if (isNaN(id)) {
            throw new Error("O ID fornecido deve ser um número válido.");
        }
        const category = await this.categoryRepository.findById(id);
        if (!category) {
            throw new Error("Categoria não encontrada.");
        }
        return category;
    }
    async updateCategory(id, data) {
        const exists = await this.categoryRepository.findById(id);
        if (!exists)
            throw new Error("Categoria não encontrada.");
        const updates = {};
        if (data.name !== undefined)
            updates.name = data.name;
        if (data.order !== undefined)
            updates.order = data.order;
        if (data.description !== undefined)
            updates.description = data.description;
        if (Object.keys(updates).length === 0) {
            return exists;
        }
        return await this.categoryRepository.update(id, updates);
    }
    async deleteCategory(id) {
        const signsInCategory = await this.signRepository.findByCategory(id);
        if (signsInCategory && signsInCategory.length > 0) {
            throw new Error("Não é possível deletar esta categoria pois ela possui sinais vinculados. Delete os sinais primeiro.");
        }
        await this.categoryRepository.delete(id);
    }
}
//# sourceMappingURL=categoryService.js.map