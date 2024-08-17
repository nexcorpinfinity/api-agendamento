import { Request, Response } from 'express';
import AuthService from '../../auth/services/AuthService';

import { Comercio } from '../entities/Commerce';
import { Produto } from '../entities/Products';

class ProductsController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
        this.cadastrarProdutos = this.cadastrarProdutos.bind(this);
        this.trazerProdutosDoCostumer = this.trazerProdutosDoCostumer.bind(this);
    }

    async cadastrarProdutos(req: Request, res: Response) {
        const userLogged = this.authService.usuarioAutenticado(req);

        console.log(userLogged?.id);

        const buscarRestaurante = await Comercio.findOne({
            where: { usuario_id: userLogged?.id },
        });

        const idRestaurante = buscarRestaurante?.dataValues.id;

        const { product_name, price } = req.body;

        const produto = await Produto.create({
            product_name,
            price,
            comercio_id: idRestaurante,
        });

        res.json({ produto });
    }

    async trazerProdutosDoCostumer(req: Request, res: Response) {
        try {
            const userLogged = this.authService.usuarioAutenticado(req);

            if (!userLogged) {
                return res.status(401).json({ error: 'Usuário não autenticado' });
            }

            console.log(userLogged.id);

            const buscarRestaurante = await Comercio.findOne({
                where: { usuario_id: userLogged.id },
            });

            if (!buscarRestaurante) {
                return res.status(404).json({ error: 'Você não tem restaurante cadastrado' });
            }

            const idRestaurante = buscarRestaurante.dataValues?.id;
            console.log(idRestaurante);

            const produtos = await Produto.findAll({ where: { comercio_id: idRestaurante } });

            res.json({ todosProdutos: produtos });
        } catch (error) {
            console.error('Erro ao trazer produtos do cliente:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}

export default new ProductsController();
