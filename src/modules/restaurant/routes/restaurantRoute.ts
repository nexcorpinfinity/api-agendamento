import { Router } from 'express';
import RestaurantController from '../controllers/RestaurantController';
import { authenticateToken } from '../../../middleware/AuthPermission';
import AuthLoginRequired from '../../../middleware/AuthLoginRequired';
import { Role } from '../../users/Permissions';

const restaurantRoute = Router();

// restaurantRoute.get('/', authenticateToken([Role.Admin, Role.Costumer]), AuthLoginRequired, RestaurantController.index);

restaurantRoute.get('/cadastrar', authenticateToken([Role.User, Role.Admin]), AuthLoginRequired, RestaurantController.createRestaurante);

export { restaurantRoute };
