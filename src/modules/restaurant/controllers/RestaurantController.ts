import { Request, Response } from 'express';
import AuthService from '../../auth/services/AuthService';
import { receberIdPeloToken } from '../../../utils/DecodeToken';

class RestaurantController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
        this.index = this.index.bind(this);
        this.createRestaurante = this.createRestaurante.bind(this);
    }

    createRestaurante(req: Request, res: Response) {
        const userLogged = this.authService.usuarioAutenticado(req);

        // console.log(userLogged); // { UUID e Permission }

        if (userLogged === null || userLogged === undefined) return res.status(403).json('usuario nao autenticado');

        const client_id = userLogged?.id;

        const { comercioName, cpfcnpj, endereco } = req.body;

        const obj = { comercioName, cpfcnpj, endereco, client_id };

        console.log(obj);

        // console.log(userLogged?.id, userLogged?.permission);

        res.json('hello restaurante');
    }

    index(req: Request, res: Response) {
        const userLogged = this.authService.usuarioAutenticado(req);
        // obtem o id e a permissao, valida a permissao e deixa passasr para validar o resto no service
        // aqui verifica a permissao de costumer e admin pode ter acesso a essa rota
        if (userLogged) {
            console.log(userLogged.id, userLogged.permission);
            res.json('hello Admin');
        } else {
            res.status(401).json({ message: 'Usuário não autenticado' });
        }
    }

    usuarioAutenticado(req: Request) {
        const authHeader = req.headers.authorization;

        if (authHeader === undefined) return 'error o token é undefined ';

        const userLogged = receberIdPeloToken(authHeader);

        console.log(userLogged);
        console.log(userLogged?.id, userLogged?.permission);

        return userLogged;
    }
}

export default new RestaurantController();
