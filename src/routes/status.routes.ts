import { Router} from 'express';
import type { Request, Response } from 'express';
import { handleAnswerResponse } from '../controller/userController.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const routes = Router();

routes.get('/status', (req: Request, res: Response) => {
    return res.json({ 
        status: "online",
        timestamp: new Date(),
        projeto: "Sinais de Inclusão"
    });
});

routes.post('/answer', authMiddleware, handleAnswerResponse);

export default routes;