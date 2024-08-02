import { Router } from 'express';
import AuthController from '../controllers/AuthController';

const authRoute = Router();

authRoute.post('/', AuthController.store);

export { authRoute };
