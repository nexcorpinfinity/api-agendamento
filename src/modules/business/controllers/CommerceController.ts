import { Request, Response } from 'express';
import AuthService from '../../auth/services/AuthService';
import { receberIdPeloToken } from '../../../utils/DecodeToken';
import { ComercioBodyProps } from '../interface/BodyRequest';
import ComercioService from '../services/ComercioService';

import { Business } from '../entities/Business';
import { User } from '../../users/entities/User';
import { Produto } from '../entities/Products';

class CommerceController {
    protected authService: AuthService;
    private comercioService: ComercioService;

    constructor() {
        this.authService = new AuthService();
        this.comercioService = new ComercioService();
        this.index = this.index.bind(this);

        this.createComercio = this.createComercio.bind(this);
        this.trazerDadosDoUsuarioCompleto = this.trazerDadosDoUsuarioCompleto.bind(this);
    }

    createComercio(req: Request, res: Response) {
        const userLogged = this.authService.usuarioAutenticado(req);

        console.log(userLogged);

        const client_id = userLogged?.id;

        const { comercio_name, cpf_cnpj, endereco } = req.body;

        const obj: ComercioBodyProps = { comercio_name, cpf_cnpj, endereco, client_id };

        const criarComercios = this.comercioService.criarComercio(obj);

        res.json(criarComercios);
    }

    async trazerDadosDoUsuarioCompleto(req: Request, res: Response) {
        const userLogged = this.authService.usuarioAutenticado(req);

        const { ativos } = req.query;

        console.log('teste:', ativos);

        const user = await User.findByPk(userLogged?.id, {
            include: {
                model: Business,
                include: [Produto],
            },
        });

        if (!user) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        const userJson = user.toJSON();

        /* ocultar alguns campos  */
        const testiser = {
            ...userJson,
            password: undefined,
            roles: undefined,
            Comercio: {
                // ...userJson.Comercio,
                cpf_cpnj: undefined,
                usuario_id: undefined,
            },
        };
        console.log(userLogged);
        res.json(testiser);
    }

    index(req: Request, res: Response) {
        const userLogged = this.authService.usuarioAutenticado(req);

        /* obtem o id e a permissao, valida a permissao e deixa passasr para validar o resto no service
        aqui verifica a permissao de costumer e admin pode ter acesso a essa rota */
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

export default new CommerceController();
