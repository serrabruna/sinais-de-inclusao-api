import type { Request, Response } from 'express';
import { FavoriteService } from '../service/favoriteService.js';

const favoriteService = new FavoriteService();

export class FavoriteController {
    async handleToggle(req: Request, res: Response) {
        try {
            if (!(req as any).userId) {
                return res.status(401).json({ error: "Usuário não autenticado. Token ausente ou inválido." });
            }
            const userId = (req as any).userId; 
            const { signId } = req.body;
            const result = await favoriteService.toggleFavorite(userId, Number(signId));
            return res.json(result);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    
    async handleListMyFavorites(req: Request, res: Response) {
        try {
            if (!(req as any).userId) {
                return res.status(401).json({ error: "Usuário não autenticado. Token ausente ou inválido." });
            }
            const userId = (req as any).userId;
            const favorites = await favoriteService.listUserFavorites(userId);
            return res.json(favorites);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
    }