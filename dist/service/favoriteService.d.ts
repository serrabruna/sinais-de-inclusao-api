export declare class FavoriteService {
    private favoriteRepository;
    constructor();
    toggleFavorite(userId: string, signId: number): Promise<{
        isFavorite: boolean;
        message: string;
    }>;
    listUserFavorites(userId: string): Promise<{
        id: any;
        name: any;
        imagePath: any;
        statement: any;
    }[]>;
}
//# sourceMappingURL=favoriteService.d.ts.map