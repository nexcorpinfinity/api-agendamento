import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import { authenticateToken } from '../../../middleware/AuthPermission';
import AuthLoginRequired from '../../../middleware/AuthLoginRequired';
import { Role } from '../Permissions';

const usersRoute = Router();

usersRoute.post('/cadastrar-usuario', UsersController.createUserNormal);
// apenas user admin pode criar admin
usersRoute.post('/cadastrar-admin', authenticateToken([Role.Admin]), AuthLoginRequired, UsersController.createUserAdmin);

// usersRoute.post('/cadastrar-comercio', UsersRoute.createUserAdmin);
// usersRoute.post('/cadastrar-restaurante', UsersRoute.createUserAdmin);

export { usersRoute };
