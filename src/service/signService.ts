import { SignRepository } from '../repository/signRepository.js';
import type { Sign } from '../model/sign.js';

export class SignService {
    private signRepository: SignRepository;

    constructor() {
        this.signRepository = new SignRepository();
    }

    async listCategories() {
        return await this.signRepository.getAllCategories();
    }

    async getQuestionsByCategory(categoryId: number): Promise<Sign[]> {
        const signs = await this.signRepository.findByCategory(categoryId);

        if (!signs || signs.length === 0) {
        throw new Error("Nenhum sinal encontrado para esta categoria.");
        }

        const processedSigns = signs.map(sign => {
            if (sign.options && sign.options.length > 0) {
                return {
                ...sign,
                options: this.shuffleArray([...sign.options]) 
                };
            }
            return sign;
        });

        return processedSigns;
    }

    private shuffleArray(array: string[]): string[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const itemI = array[i];
            const itemJ = array[j];

            if (itemI !== undefined && itemJ !== undefined) {
            array[i] = itemJ;
            array[j] = itemI;
            }
        }
        return array;
    }
}