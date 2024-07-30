import { Router } from 'express';
import ReportsController from '../controllers/RestaurantsController';

const reportsRoute = Router();

reportsRoute.get('/', ReportsController.index);

export { reportsRoute };
