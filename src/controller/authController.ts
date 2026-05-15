import type { Request, Response } from 'express';
import { AuthService } from '../service/authService.js';

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;
        const user = await authService.signUp(email, password, name);
        return res.status(201).json(user);
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const data = await authService.signIn(email, password);
        return res.json(data);
    } catch (error: any) {
        return res.status(401).json({ error: error.message });
    }
};