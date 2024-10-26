import { Router } from 'express';

import { UserController } from '../controllers/UsersController';
import { UserEntity } from '../entities/UserEntity';
import { ValidationUser } from '../middleware/ValidationsUser';
import { UserRepository } from '../repository/UserRepository';
import UserService from '../services/UserService';

const validationUser = new ValidationUser();

const userRepository = new UserRepository(UserEntity);

const userService = new UserService(userRepository);

const userController = new UserController(userService);

const usersRoute = Router();

usersRoute.post('/client', validationUser.createdUsers, (req, res) =>
    userController.createClientUser(req, res),
);
usersRoute.post('/admin', validationUser.createdUsers, (req, res) =>
    userController.createAdminUser(req, res),
);
usersRoute.post('/business', validationUser.createdUsers, (req, res) =>
    userController.createBusinessUser(req, res),
);

export { usersRoute };
