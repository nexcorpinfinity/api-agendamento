import { Request, Response } from 'express';
import { receberIdPeloToken } from '../../utils/DecodeToken';
import AuthService from '../../modules/auth/services/AuthService';

class AdminController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
        this.index = this.index.bind(this);
    }

    index(req: Request, res: Response) {
        // const userLogged = this.authService.usuarioAutenticado(req);
        // // obtem o id e a permissao, valida a permissao e deixa passasr para validar o resto no service
        // if (userLogged) {
        //     console.log(userLogged.id, userLogged.permission);
        //     res.json('hello Admin');
        // } else {
        //     res.status(401).json({ message: 'Usuário não autenticado' });
        // }

        res.json('hello admin');
    }

    usuarioAutenticado(req: Request) {
        const authHeader = req.headers.authorization;

        if (authHeader === undefined) return 'error o token é undefined ';

        const userLogged = receberIdPeloToken(authHeader);

        console.log(userLogged);
        console.log(userLogged?.id, userLogged?.permission);

        return userLogged;
    }

    // dashBoard(req: Request, res: Response) {}
}

export default new AdminController();
