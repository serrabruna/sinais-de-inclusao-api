import { Router } from 'express';
import type { Request, Response } from 'express';
import { handleAnswerResponse } from '../controller/userController.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { login, register } from '../controller/authController.js';
import { SignController } from '../controller/signController.js';
import { CategoryController } from '../controller/categoryController.js';
import { FavoriteController } from '../controller/favoriteController.js';
import { adminMiddleware } from '../middlewares/role.middleware.js';

const categoryController = new CategoryController();
const signController = new SignController();
const favoriteController = new FavoriteController();

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

routes.get('/categories', authMiddleware, categoryController.handleListCategories);
routes.get('/categories/:id', authMiddleware, categoryController.handleGetCategoryById);

routes.post('/categories', authMiddleware, adminMiddleware, categoryController.handleCreateCategory);
routes.put('/categories/:id', authMiddleware, adminMiddleware, categoryController.handleUpdateCategory);
routes.delete('/categories/:id', authMiddleware, adminMiddleware, categoryController.handleDeleteCategory);

routes.get('/categories/:id/signs', authMiddleware, signController.handleGetQuestions); 

routes.get('/signs', authMiddleware, signController.handleListAllSigns);

routes.post('/signs', authMiddleware, adminMiddleware, signController.handleCreateSign);
routes.put('/signs/:id', authMiddleware, adminMiddleware, signController.handleUpdateSign);
routes.delete('/signs/:id', authMiddleware, adminMiddleware, signController.handleDeleteSign);

routes.post('/answer', authMiddleware, handleAnswerResponse);

routes.post('/favorites', authMiddleware, favoriteController.handleToggle);
routes.get('/favorites/me', authMiddleware, favoriteController.handleListMyFavorites);

export default routes;