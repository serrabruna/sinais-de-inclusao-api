import { Router} from 'express';
import type { Request, Response } from 'express';

const statusRouter = Router();

statusRouter.get('/status', (req: Request, res: Response) => {
    return res.json({ 
        status: "online",
        timestamp: new Date(),
        projeto: "Sinais de Inclusão"
    });
});

export default statusRouter;