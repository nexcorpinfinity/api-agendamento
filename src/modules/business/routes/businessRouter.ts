import { Router } from 'express';

import { BusinessController } from '../controllers/BusinessController';
import { BusinessRepository } from '../repository/BusinessRepository';
import BusinessService from '../services/BusinessService';

const businessRouter = Router();

const businessRepository = new BusinessRepository();

const businessService = new BusinessService(businessRepository);

const businessController = new BusinessController(businessService);

businessRouter.get('/', businessController.getAlldata);
businessRouter.get('/');



export { businessRouter };
