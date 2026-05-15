import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
    sub: string; 
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Token não fornecido" });
    }

    const [, token] = authHeader.split(' ');
    try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET não configurado no .env");
    }

    const decoded = jwt.verify(token as string, secret) as TokenPayload;
    req.userId = decoded.sub;
    return next();
    } catch (err) {
        return res.status(401).json({ error: "Token inválido ou expirado" });
    }
};