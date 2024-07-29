import { Router } from 'express';
import RestaurantController from '../controllers/RestaurantController';

const restaurantRoute = Router();

restaurantRoute.get('/', RestaurantController.index);

export { restaurantRoute };
