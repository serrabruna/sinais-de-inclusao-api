import { CategoryRepository } from "../repository/categoryRepository.js";
import type { Category } from "../model/category.js";

export class CategoryService {
    private categoryRepository: CategoryRepository;

    constructor() {
        this.categoryRepository = new CategoryRepository();
    }

    async createCategory(data: Omit<Category, 'id'>): Promise<Category> {
        if (!data.name || !data.description) {
            throw new Error("Nome e descrição são obrigatórios.");
        }
        return await this.categoryRepository.create(data);
    }

    async listAll(): Promise<Category[]> {
        return await this.categoryRepository.findAll();
    }
}
