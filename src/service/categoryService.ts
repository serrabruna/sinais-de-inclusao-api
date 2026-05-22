import { CategoryRepository } from "../repository/categoryRepository.js";
import type { Category } from "../model/category.js";

export class CategoryService {
    private categoryRepository: CategoryRepository;

    constructor() {
        this.categoryRepository = new CategoryRepository();
    }

    async createCategory(data: Omit<Category, 'id'>): Promise<Category> {
        const alreadyExists = await this.categoryRepository.findByName(data.name);
        if (alreadyExists) {
            throw new Error("Categoria com este nome já existe.");
        }
        if (!data.name || !data.description) {
            throw new Error("Nome e descrição são obrigatórios.");
        }
        return await this.categoryRepository.create(data);
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
        
        return await this.categoryRepository.update(id, data);
    }

    async deleteCategory(id: number): Promise<void> {
        const exists = await this.categoryRepository.findById(id);
        if (!exists) throw new Error("Categoria não encontrada.");

        await this.categoryRepository.delete(id);
    }
}
