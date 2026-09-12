import { Router } from 'express';
import type { Request, Response } from 'express';
import {
  deleteAccount,
  getProfile,
  handleAnswerResponse,
  postStreak,
  updateProfile,
} from '../controller/userController.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { login, register } from '../controller/authController.js';
import { SignController } from '../controller/signController.js';
import { CategoryController } from '../controller/categoryController.js';
import { FavoriteController } from '../controller/favoriteController.js';
import { adminMiddleware } from '../middlewares/role.middleware.js';
import * as userController from '../controller/userController.js';
import multer from 'multer';

const categoryController = new CategoryController();
const signController = new SignController();
const favoriteController = new FavoriteController();
const upload = multer({ storage: multer.memoryStorage() });

const routes = Router();

routes.get('/status', (req: Request, res: Response) => {
  return res.json({
    status: 'online',
    timestamp: new Date(),
    projeto: 'Sinais de Inclusão',
  });
});

// Autenticação & Usuário
routes.post('/signup', register);
routes.post('/login', login);
routes.get('/user/xp', authMiddleware, userController.getUserXp);
routes.get('/user/profile', authMiddleware, getProfile);
routes.patch('/user/profile', authMiddleware, updateProfile);
routes.delete('/user/profile', authMiddleware, deleteAccount);
routes.post('/user/streak', authMiddleware, postStreak);

// Categorias
routes.get('/categories', authMiddleware, categoryController.handleListCategories);
routes.get('/categories/:id', authMiddleware, categoryController.handleGetCategoryById);
routes.post('/categories', authMiddleware, adminMiddleware, categoryController.handleCreateCategory);
routes.put('/categories/:id', authMiddleware, adminMiddleware, categoryController.handleUpdateCategory);
routes.delete('/categories/:id', authMiddleware, adminMiddleware, categoryController.handleDeleteCategory);

// Progresso e Estrelas da Categoria
routes.post('/categories/:id/stars', authMiddleware, categoryController.saveStars);

// Sinais e Quiz
routes.get('/categories/:id/signs', authMiddleware, signController.handleGetQuestions);
routes.get('/signs', authMiddleware, signController.handleListAllSigns);
routes.post('/signs', authMiddleware, upload.single('image'), signController.handleCreateSign);
routes.put('/signs/:id', authMiddleware, adminMiddleware, signController.handleUpdateSign);
routes.delete('/signs/:id', authMiddleware, adminMiddleware, signController.handleDeleteSign);

// Respostas / Gameficação
routes.post('/answer', authMiddleware, handleAnswerResponse);

// Favoritos
routes.post('/favorites', authMiddleware, favoriteController.handleToggle);
routes.get('/favorites/me', authMiddleware, favoriteController.handleListMyFavorites);

export default routes;