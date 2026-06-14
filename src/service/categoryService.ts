import { CategoryRepository } from "../repository/categoryRepository.js";
import type { Category } from "../model/category.js";
import { SignRepository } from "../repository/signRepository.js";


export class CategoryService {
    private categoryRepository: CategoryRepository;
    private signRepository: SignRepository = new SignRepository();

    constructor() {
        this.categoryRepository = new CategoryRepository();
    }

    async createCategory(data: { name: string; order?: number; description: string }): Promise<Category> {
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
    
    return await this.categoryRepository.create(
        sanitizedName, 
        data.description
    );
}

    async listAll(): Promise<Category[]> {
        return await this.categoryRepository.findAll();
    }

    async getById(id: number): Promise<Category> {
        if (isNaN(id)) {
            throw new Error("O ID fornecido deve ser um número válido.");
        }

        const category = await this.categoryRepository.findById(id);
        
        if (!category) {
            throw new Error("Categoria não encontrada.");
        }

        return category;
    }

    async updateCategory(id: number, data: Partial<Category>): Promise<Category> {
        const exists = await this.categoryRepository.findById(id);
        if (!exists) throw new Error("Categoria não encontrada.");

        const updates: Partial<Category> = {};

        if (data.name !== undefined) updates.name = data.name;
        if (data.order !== undefined) updates.order = data.order;
        if (data.description !== undefined) updates.description = data.description;
        if (Object.keys(updates).length === 0) {
            return exists;
        }
        return await this.categoryRepository.update(id, updates);
    }

    async deleteCategory(id: number): Promise<void> {
        const signsInCategory = await this.signRepository.findByCategory(id);
    
        if (signsInCategory && signsInCategory.length > 0) {
            throw new Error("Não é possível deletar esta categoria pois ela possui sinais vinculados. Delete os sinais primeiro.");
        }

        await this.categoryRepository.delete(id);
    }
}
