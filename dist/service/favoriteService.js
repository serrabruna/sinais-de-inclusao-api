import { FavoriteRepository } from '../repository/favoriteRepository.js';
export class FavoriteService {
    favoriteRepository;
    constructor() {
        this.favoriteRepository = new FavoriteRepository();
    }
    async toggleFavorite(userId, signId) {
        if (!signId)
            throw new Error("ID do sinal é obrigatório.");
        const alreadyFavorite = await this.favoriteRepository.findSpecific(userId, signId);
        if (alreadyFavorite) {
            await this.favoriteRepository.remove(userId, signId);
            return { isFavorite: false, message: "Removido dos favoritos." };
        }
        else {
            await this.favoriteRepository.add(userId, signId);
            return { isFavorite: true, message: "Adicionado aos favoritos." };
        }
    }
    async listUserFavorites(userId) {
        return await this.favoriteRepository.findByUserId(userId);
    }
}
//# sourceMappingURL=favoriteService.js.map