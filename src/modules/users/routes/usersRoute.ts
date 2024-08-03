import { Router } from 'express';
import UsersRoute from '../controllers/UsersController';
import { authenticateToken } from '../../../middleware/AuthPermission';

const usersRoute = Router();

usersRoute.post('/cadastrar-usuario', UsersRoute.createUserNormal);
// apenas user admin pode criar admin
usersRoute.post('/cadastrar-admin', authenticateToken(['admin']), UsersRoute.createUserAdmin);

// usersRoute.post('/cadastrar-comercio', UsersRoute.createUserAdmin);
// usersRoute.post('/cadastrar-restaurante', UsersRoute.createUserAdmin);

export { usersRoute };
