import type { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../repository/userRepository.js';

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = (req as any).userId;
        if (!id) {
            return res.status(401).json({ error: "Usuário não autenticado no sistema." });
        }

        const userRepository = new UserRepository();
        const user = await userRepository.findById(id);

        if (!user) {
            return res.status(403).json({ error: "Usuário não encontrado." });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ error: "Acesso negado. Rota exclusiva para administradores." });
        }
        return next();
    } catch (error: any) {
        return res.status(500).json({ error: "Erro interno ao validar permissões do administrador." });
    }
};