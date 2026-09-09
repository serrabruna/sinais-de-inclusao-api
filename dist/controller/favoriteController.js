import { FavoriteService } from '../service/favoriteService.js';
const favoriteService = new FavoriteService();
export class FavoriteController {
    async handleToggle(req, res) {
        try {
            if (!req.userId) {
                return res.status(401).json({ error: "Usuário não autenticado. Token ausente ou inválido." });
            }
            const userId = req.userId;
            const { signId } = req.body;
            const result = await favoriteService.toggleFavorite(userId, Number(signId));
            return res.json(result);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async handleListMyFavorites(req, res) {
        try {
            if (!req.userId) {
                return res.status(401).json({ error: "Usuário não autenticado. Token ausente ou inválido." });
            }
            const userId = req.userId;
            const favorites = await favoriteService.listUserFavorites(userId);
            return res.json(favorites);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
//# sourceMappingURL=favoriteController.js.map