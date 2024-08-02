import { Router } from 'express';
import AdminController from '../controllers/AdminController';
import AuthLoginRequired from '../../middleware/AuthLoginRequired';
import { authenticateToken } from '../../middleware/AuthPermission';

const adminRoute: Router = Router();

adminRoute.get('/', authenticateToken('admin'), AuthLoginRequired, AdminController.index);

export { adminRoute };
