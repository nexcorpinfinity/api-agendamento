import { Router } from 'express';
import AdminController from '../controllers/AdminController';
import AuthLoginRequired from '../../middleware/AuthLoginRequired';
import { authenticateToken } from '../../middleware/AuthPermission';
import { Role } from '../../modules/users/Permissions';

const adminRoute: Router = Router();

adminRoute.get('/', AuthLoginRequired, authenticateToken([Role.Admin]), AdminController.index);

export { adminRoute };
