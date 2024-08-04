import { Request, Response } from 'express';
import AuthService from '../../auth/services/AuthService';

class ProductsController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
        this.cadastrarProdutos = this.cadastrarProdutos.bind(this);
    }

    cadastrarProdutos(req: Request, res: Response) {
        const userLogged = this.authService.usuarioAutenticado(req);
        res.json({ msg: 'ok', userLogged });
    }
}

export default new ProductsController();
