import { Router } from 'express';
import { authenticateToken } from '../../../middleware/AuthPermission';
import AuthLoginRequired from '../../../middleware/AuthLoginRequired';
import { Role } from '../../users/Permissions';
import CommerceController from '../controllers/CommerceController';
import ProductsController from '../controllers/ProductsController';

const commerceRoute = Router();

commerceRoute.get('/usuario', authenticateToken([Role.Admin, Role.Costumer]), AuthLoginRequired, CommerceController.trazerDadosDoUsuarioCompleto);

commerceRoute.post('/cadastrar', AuthLoginRequired, CommerceController.createComercio);

commerceRoute.post('/cadastrar-produtos', AuthLoginRequired, authenticateToken([Role.Costumer, Role.Admin]), ProductsController.cadastrarProdutos);

commerceRoute.get('/meus-produtos-cadastrados', AuthLoginRequired, authenticateToken([Role.Costumer]), ProductsController.trazerProdutosDoCostumer);

export { commerceRoute };
