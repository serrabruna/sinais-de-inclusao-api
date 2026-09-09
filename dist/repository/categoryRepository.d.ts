import type { Category } from "../model/category.js";
export declare class CategoryRepository {
    create(name: string, description: string): Promise<Category>;
    findAll(): Promise<Category[]>;
    findById(id: number): Promise<Category | null>;
    findByName(name: string): Promise<Category | null>;
    update(id: number, category: Partial<Category>): Promise<Category>;
    delete(id: number): Promise<void>;
}
//# sourceMappingURL=categoryRepository.d.ts.map