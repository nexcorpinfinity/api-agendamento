import { Router } from 'express';
import UsersRoute from '../controllers/UsersController';

const usersRoute = Router();

usersRoute.post('/cadastrar-usuario', UsersRoute.createUserNormal);
// usersRoute.post('/cadastrar-restaurante', UsersRoute.createUserRestaurante);
// usersRoute.post('/cadastrar-comercio', UsersRoute.createUserAdmin);
// usersRoute.post('/cadastrar-restaurante', UsersRoute.createUserAdmin);

export { usersRoute };
