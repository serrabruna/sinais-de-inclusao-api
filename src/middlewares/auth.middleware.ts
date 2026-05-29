import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare module 'express-serve-static-core' {
    interface Request {
        userId?: string;
        userRole?: string;
    }
}

interface TokenPayload {
    sub: string; 
    role: string; 
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Token não fornecido" });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ error: "Token malformado" });
    }

    const token: string = parts[1]!;

    try {
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error("JWT_SECRET não configurado no .env");
        }

        const decoded = jwt.verify(token, secret as string) as any as TokenPayload;
        
        req.userId = decoded.sub;
        req.userRole = decoded.role;
        
        (req as any).user = {
            id: decoded.sub,
            role: decoded.role
        };

        return next();
    } catch (err) {
        return res.status(401).json({ error: "Token inválido ou expirado" });
    }
};