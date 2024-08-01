import { Router } from 'express';
import OrderController from '../controllers/OrderController';

const orderRoute = Router();

orderRoute.get('/', OrderController.index);

export { orderRoute };
