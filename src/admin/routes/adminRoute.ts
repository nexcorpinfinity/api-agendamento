import { Router } from 'express';
import AdminController from '../controllers/AdminController';

const adminRoute: Router = Router();

adminRoute.get('/', AdminController.index);

export { adminRoute };
