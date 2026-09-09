import type { Category } from "../model/category.js";
export declare class CategoryService {
    private categoryRepository;
    private signRepository;
    constructor();
    createCategory(data: {
        name: string;
        order?: number;
        description: string;
    }): Promise<Category>;
    listAll(): Promise<Category[]>;
    getById(id: number): Promise<Category>;
    updateCategory(id: number, data: Partial<Category>): Promise<Category>;
    deleteCategory(id: number): Promise<void>;
}
//# sourceMappingURL=categoryService.d.ts.map