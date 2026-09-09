export declare class FavoriteService {
    private favoriteRepository;
    constructor();
    toggleFavorite(userId: string, signId: number): Promise<{
        isFavorite: boolean;
        message: string;
    }>;
    listUserFavorites(userId: string): Promise<import("../model/favorite.js").FavoriteWithSign[]>;
}
//# sourceMappingURL=favoriteService.d.ts.map