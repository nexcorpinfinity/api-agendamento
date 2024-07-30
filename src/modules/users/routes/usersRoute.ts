import { Router } from 'express';
import UsersRoute from '../controllers/UsersController';

const usersRoute = Router();

usersRoute.get('/', UsersRoute.index);

export { usersRoute };
