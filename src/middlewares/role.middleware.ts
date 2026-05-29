import type { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../repository/userRepository.js';

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    
    const role = req.userRole || (req as any).user?.role;

    if (!role) {
        return res.status(401).json({ error: "Nível de acesso não identificado. Faça login novamente." });
    }

    if (role !== 'admin') {
        return res.status(403).json({ error: "Acesso negado. Rota exclusiva para administradores." });
    }

    return next();
};