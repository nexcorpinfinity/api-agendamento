import { Router } from 'express';
import UsersRoute from '../controllers/UsersController';

const usersRoute = Router();

usersRoute.post('/cadastrar', UsersRoute.createUserNormal);
// usersRoute.post('/cadastrar-restaurante', UsersRoute.createUserRestaurante);
// usersRoute.post('/cadastrar-restaurante', UsersRoute.createUserAdmin);

export { usersRoute };
