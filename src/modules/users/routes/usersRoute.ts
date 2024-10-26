import { Router } from 'express';

import { UserController } from '../controllers/UsersController';
import { UserEntity } from '../entities/UserEntity';
// import { ValidationUser } from '../middleware/ValidationsUser';
import { UserRepository } from '../repository/UserRepository';
import UserService from '../services/UserService';

// const validationUser = new ValidationUser();

const userEntity = new UserEntity();

const userRepository = new UserRepository(userEntity);

const userService = new UserService(userRepository);

const userController = new UserController(userService);

const usersRoute = Router();

usersRoute.post('/user', (req, res) => userController.createClientUser(req, res));
usersRoute.post('/admin', (req, res) => userController.createAdminUser(req, res));
usersRoute.post('/business', (req, res) => userController.createBusinessUser(req, res));

export { usersRoute };
