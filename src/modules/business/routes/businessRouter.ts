import { Router } from 'express';

import AuthLoginRequired from '../../../middleware/AuthLoginRequired';
import { UserRepository } from '../../users/repository/UserRepository';
import { BusinessController } from '../controllers/BusinessController';
import { BusinessRepository } from '../repository/BusinessRepository';
import { BusinessService } from '../services/BusinessService';

const businessRouter = Router();

const businessRepository = new BusinessRepository();
const userRepository = new UserRepository();

// const businessService = new BusinessService(businessRepository, userRepository);
const businessService = new BusinessService(businessRepository, userRepository);

const businessController = new BusinessController(businessService);

businessRouter.get('/profile', AuthLoginRequired, (req, res) =>
    businessController.getAlldataUserAndBusiness(req, res),
);

export { businessRouter };
