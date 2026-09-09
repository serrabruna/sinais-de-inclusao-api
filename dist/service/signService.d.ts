import type { Sign } from '../model/sign.js';
export declare class SignService {
    private signRepository;
    constructor();
    createSign(data: {
        categoryId: number;
        name: string;
        statement: string;
        imagePath: string;
        correctAnswer: string;
        options: string[];
    }): Promise<Sign>;
    listAllSigns(): Promise<Sign[]>;
    listCategories(): Promise<any[]>;
    getQuestionsByCategory(categoryId: number): Promise<Sign[]>;
    private shuffleArray;
    processAnswer(signId: number, userAnswer: string): Promise<boolean>;
    updateSign(id: number, data: Partial<Sign> & {
        categoryId?: number;
        imagePath?: string;
        correctAnswer?: string;
    }): Promise<Sign>;
    deleteSign(id: number): Promise<void>;
}
//# sourceMappingURL=signService.d.ts.map