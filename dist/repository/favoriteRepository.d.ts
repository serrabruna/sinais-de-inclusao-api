import type { Favorite, FavoriteWithSign } from '../model/favorite.js';
export declare class FavoriteRepository {
    add(userId: string, signId: number): Promise<Favorite>;
    remove(userId: string, signId: number): Promise<void>;
    findSpecific(userId: string, signId: number): Promise<Favorite | null>;
    findByUserId(userId: string): Promise<FavoriteWithSign[]>;
}
//# sourceMappingURL=favoriteRepository.d.ts.map