import { SignRepository } from '../repository/signRepository.js';
export class SignService {
    signRepository;
    constructor() {
        this.signRepository = new SignRepository();
    }
    async createSign(data) {
        if (!data.name || !data.categoryId || !data.correctAnswer || !data.options) {
            throw new Error("Campos obrigatórios estão faltando.");
        }
        const sanitizedName = data.name.trim();
        if (!sanitizedName) {
            throw new Error("O nome do sinal não pode ser composto apenas por espaços.");
        }
        const alreadyExists = await this.signRepository.findByNameAndCategory(sanitizedName, data.categoryId);
        if (alreadyExists) {
            throw new Error("Este sinal já está cadastrado nesta categoria.");
        }
        if (!data.options.includes(data.correctAnswer)) {
            throw new Error("A resposta correta deve ser uma das opções fornecidas.");
        }
        return await this.signRepository.create({
            category_id: data.categoryId,
            name: sanitizedName,
            statement: data.statement,
            image_path: data.imagePath,
            correct_answer: data.correctAnswer,
            options: data.options
        });
    }
    async listAllSigns() {
        const signs = await this.signRepository.findAll();
        return signs.map(sign => {
            if (sign.options && sign.options.length > 0) {
                return {
                    ...sign,
                    options: this.shuffleArray([...sign.options])
                };
            }
            return sign;
        });
    }
    async listCategories() {
        return await this.signRepository.getAllCategories();
    }
    async getQuestionsByCategory(categoryId) {
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
    shuffleArray(array) {
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
    async processAnswer(signId, userAnswer) {
        const sign = await this.signRepository.findById(signId);
        if (!sign)
            throw new Error("Sinal não encontrado.");
        const normalize = (str) => {
            return str
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .trim();
        };
        const cleanUserAnswer = normalize(userAnswer);
        const cleanCorrectAnswer = normalize(sign.correct_answer);
        console.log(`Debug: Comparando '${cleanUserAnswer}' com '${cleanCorrectAnswer}'`);
        return cleanUserAnswer === cleanCorrectAnswer;
    }
    async updateSign(id, data) {
        const exists = await this.signRepository.findById(id);
        if (!exists)
            throw new Error("Sinal não encontrado.");
        const dataToUpdate = {};
        if (data.name !== undefined)
            dataToUpdate.name = data.name;
        if (data.statement !== undefined)
            dataToUpdate.statement = data.statement;
        if (data.imagePath !== undefined)
            dataToUpdate.image_path = data.imagePath;
        if (data.categoryId !== undefined)
            dataToUpdate.category_id = data.categoryId;
        if (data.correctAnswer !== undefined)
            dataToUpdate.correct_answer = data.correctAnswer;
        if (data.options !== undefined) {
            const correct = data.correctAnswer ?? (dataToUpdate.correct_answer || exists.correct_answer);
            if (!data.options.includes(correct)) {
                throw new Error("A resposta correta deve ser uma das opções.");
            }
            dataToUpdate.options = data.options;
        }
        if (Object.keys(dataToUpdate).length === 0) {
            return exists;
        }
        return await this.signRepository.update(id, dataToUpdate);
    }
    async deleteSign(id) {
        const exists = await this.signRepository.findById(id);
        if (!exists)
            throw new Error("Sinal não encontrado.");
        await this.signRepository.delete(id);
    }
}
//# sourceMappingURL=signService.js.map