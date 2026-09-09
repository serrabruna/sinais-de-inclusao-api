import type { Request, Response } from 'express';
export declare class CategoryController {
    handleListCategories(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    handleCreateCategory(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    handleGetCategoryById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    handleUpdateCategory(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    handleDeleteCategory(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=categoryController.d.ts.map