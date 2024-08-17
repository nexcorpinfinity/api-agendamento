import { Router } from 'express';
import { authenticateToken } from '../../../middleware/AuthPermission';
import AuthLoginRequired from '../../../middleware/AuthLoginRequired';
import { Role } from '../../users/Permissions';
import CommerceController from '../controllers/CommerceController';
import ProductsController from '../controllers/ProductsController';

const restaurantRoute = Router();

restaurantRoute.get('/usuario', authenticateToken([Role.Admin, Role.Costumer]), AuthLoginRequired, CommerceController.trazerDadosDoUsuarioCompleto);

restaurantRoute.post('/cadastrar', authenticateToken([Role.User, Role.Admin]), AuthLoginRequired, CommerceController.createRestaurante);

restaurantRoute.get('/produtos', authenticateToken([Role.Admin, Role.Costumer]), AuthLoginRequired, ProductsController.cadastrarProdutos);

export { restaurantRoute };
