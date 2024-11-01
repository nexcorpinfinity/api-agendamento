import { Router } from 'express';

import AuthLoginRequired from '../../../middleware/AuthLoginRequired';
import { authPermission } from '../../../middleware/AuthPermission';
import { BusinessRepository } from '../../business/repository/BusinessRepository';
import { BusinessSegmentsTypesRepository } from '../../business/repository/BusinessSegmentsTypesRepository';
import { SegmentsTypesRepository } from '../../segments/repositories/SegmentsTypesRepository';
import { UserController } from '../controllers/UsersController';
import { Permissions } from '../interfaces/EnumPermissions';
import { ValidationUser } from '../middleware/ValidationsUser';
import { UserRepository } from '../repository/UserRepository';
import { UserService } from '../services/UserService';

const validationUser = new ValidationUser();

const userRepository = new UserRepository();

const businessRepository = new BusinessRepository();

const segmentTypeRepository = new SegmentsTypesRepository();

const businessSegmentsTypesRepository = new BusinessSegmentsTypesRepository();

const userService = new UserService(
    userRepository,
    businessRepository,
    segmentTypeRepository,
    businessSegmentsTypesRepository,
);

const userController = new UserController(userService);

const usersRoute = Router();

usersRoute.post('/client', validationUser.createdUsers, (req, res) =>
    userController.createClientUser(req, res),
);
usersRoute.post(
    '/admin',
    AuthLoginRequired,
    authPermission([Permissions.Admin]),
    validationUser.createdUsers,
    (req, res) => userController.createAdminUser(req, res),
);
usersRoute.post('/business', validationUser.createdUserBusiness, (req, res) =>
    userController.createBusinessUser(req, res),
);

export { usersRoute };
