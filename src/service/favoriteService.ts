import { FavoriteRepository } from '../repository/favoriteRepository.js';

export class FavoriteService {
    private favoriteRepository: FavoriteRepository;

    constructor() {
        this.favoriteRepository = new FavoriteRepository();
    }

    async toggleFavorite(userId: string, signId: number) {
        if (!signId) throw new Error("ID do sinal é obrigatório.");

        const alreadyFavorite = await this.favoriteRepository.findSpecific(userId, signId);

        if (alreadyFavorite) {
            await this.favoriteRepository.remove(userId, signId);
            return { isFavorite: false, message: "Removido dos favoritos." };
        } else {
            await this.favoriteRepository.add(userId, signId);
            return { isFavorite: true, message: "Adicionado aos favoritos." };
        }
    }

    async listUserFavorites(userId: string) {
        const rawFavorites = await this.favoriteRepository.findByUserId(userId);

        return (rawFavorites || [])
            .filter((fav: any) => fav.signs !== null && fav.signs !== undefined)
            .map((fav: any) => ({
                id: fav.sign_id,
                name: fav.signs?.name ?? 'Sem nome',
                imagePath: fav.signs?.image_path ?? '',
                statement: fav.signs?.statement ?? ''
            }));
    }
}