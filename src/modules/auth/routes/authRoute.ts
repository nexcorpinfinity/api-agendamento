import { Router } from 'express';

import { UserRepository } from '../../users/repository/UserRepository';
import { AuthController } from '../controllers/AuthController';
import { AuthService } from '../services/AuthService';

const authRoute = Router();

const userRepository = new UserRepository();

const authService = new AuthService(userRepository);

const authController = new AuthController(authService);

authRoute.post('/', (req, res) => authController.auth(req, res));

export { authRoute };
