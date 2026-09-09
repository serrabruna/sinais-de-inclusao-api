import type { Sign } from '../model/sign.js';
export type UpdateSignDTO = {
    name?: string;
    statement?: string;
    image_path?: string;
    correct_answer?: string;
    options?: string[];
    category_id?: number;
};
export declare class SignRepository {
    findByCategory(categoryId: number): Promise<Sign[]>;
    create(sign: Omit<Sign, 'id'>): Promise<Sign>;
    findById(id: number): Promise<Sign | null>;
    findAll(): Promise<Sign[]>;
    findByNameAndCategory(name: string, categoryId: number): Promise<Sign | null>;
    getAllCategories(): Promise<any[]>;
    update(id: number, sign: UpdateSignDTO): Promise<Sign>;
    delete(id: number): Promise<void>;
}
//# sourceMappingURL=signRepository.d.ts.map