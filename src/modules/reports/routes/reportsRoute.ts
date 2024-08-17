import { Router } from 'express';
import ReportsController from '../controllers/ReportsController';

const reportsRoute = Router();

reportsRoute.get('/', ReportsController.index);

export { reportsRoute };
