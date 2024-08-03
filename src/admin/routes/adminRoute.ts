import { Router } from 'express';
import AdminController from '../controllers/AdminController';
import AuthLoginRequired from '../../middleware/AuthLoginRequired';
import { authenticateToken } from '../../middleware/AuthPermission';
import { Role } from '../../modules/users/Permissions';

const adminRoute: Router = Router();

adminRoute.get('/', authenticateToken([Role.Admin]), AuthLoginRequired, AdminController.index);

export { adminRoute };
