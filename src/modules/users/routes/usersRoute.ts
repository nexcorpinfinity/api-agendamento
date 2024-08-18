import { Router } from 'express';
import UsersController from '../controllers/UsersController';
// import { authenticateToken } from '../../../middleware/AuthPermission';
// import { Role } from '../Permissions';
import AuthLoginRequired from '../../../middleware/AuthLoginRequired';

const usersRoute = Router();

usersRoute.post('/cadastrar-usuario', UsersController.createUserNormal);
// apenas user admin pode criar admin
usersRoute.post('/cadastrar-admin', AuthLoginRequired, UsersController.createUserAdmin);

// usersRoute.post('/cadastrar-comercio', UsersRoute.createUserAdmin);
// usersRoute.post('/cadastrar-restaurante', UsersRoute.createUserAdmin);

export { usersRoute };
