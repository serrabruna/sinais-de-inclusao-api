import type { Request, Response } from 'express';
export declare class SignController {
    handleCreateSign(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    handleListCategories(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    handleGetQuestions(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    handleUpdateSign(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    handleDeleteSign(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    handleListAllSigns(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=signController.d.ts.map