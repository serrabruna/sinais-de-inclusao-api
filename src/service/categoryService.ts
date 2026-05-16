import { CategoryRepository } from "../repository/categoryRepository.js";
import type { Category } from "../model/category.js";

export class CategoryService {
    private categoryRepository: CategoryRepository;

    constructor() {
        this.categoryRepository = new CategoryRepository();
    }

    async listAll(): Promise<Category[]> {
        return await this.categoryRepository.findAll();
    }
}
