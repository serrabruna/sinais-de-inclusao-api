import { Router} from 'express';
import type { Request, Response } from 'express';
import { handleAnswerResponse } from '../controller/userController.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { login, register } from '../controller/authController.js';
import { SignController } from '../controller/signController.js';
import { CategoryController } from '../controller/categoryController.js';

const categoryController = new CategoryController();
const signController = new SignController();

const routes = Router();

routes.get('/status', (req: Request, res: Response) => {
    return res.json({ 
        status: "online",
        timestamp: new Date(),
        projeto: "Sinais de Inclusão"
    });
});

routes.post('/signup', register);
routes.post('/login', login);

routes.post('/categories', categoryController.handleCreateCategory);
routes.get('/categories', categoryController.handleListCategories);
routes.get('/categories/:id', categoryController.handleGetCategoryById);
routes.get('/categories/:id/signs', authMiddleware, signController.handleGetQuestions);
routes.put('/categories/:id', categoryController.handleUpdateCategory);
routes.delete('/categories/:id', categoryController.handleDeleteCategory); 

routes.post('/answer', authMiddleware, handleAnswerResponse);

export default routes;