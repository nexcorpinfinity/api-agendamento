import { Request, Response } from 'express';

import AuthService from '../../auth/services/AuthService';
// import { receberIdPeloToken } from '../../../utils/DecodeToken';
// import { ComercioBodyProps } from '../interface/BodyRequest';

import { UserEntity } from '../../users/entities/UserEntity';
import { Business } from '../entities/Business';
// import { Produto } from '../entities/Products';

class CommerceController {
    protected authService: AuthService;

    public constructor() {
        this.authService = new AuthService();
        this.index = this.index.bind(this);
        this.trazerDadosDoUsuarioCompleto = this.trazerDadosDoUsuarioCompleto.bind(this);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public async trazerDadosDoUsuarioCompleto(req: Request, res: Response) {
        const userLogged = this.authService.usuarioAutenticado(req);

        console.log(userLogged);

        const user = await UserEntity.findByPk(userLogged?.id, {
            include: {
                model: Business,
            },
        });

        if (!user) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        const userJson = user.toJSON();

        const userRetorned = {
            ...userJson,
            password: undefined,
            created_at: undefined,
            updated_at: undefined,
            Business: {
                ...userJson.Business,
                user_id: undefined,
                created_at: undefined,
                updated_at: undefined,
            },
        };

        return res.json(userRetorned);
    }

    public index(req: Request, res: Response) {
        const userLogged = this.authService.usuarioAutenticado(req);

        /* obtem o id e a permissao, valida a permissao e deixa passasr para validar o resto no service aqui verifica a permissao de costumer e admin pode ter acesso a essa rota */
        if (userLogged) {
            console.log(userLogged.id, userLogged.permission);
            res.json('hello Admin');
        } else {
            res.status(401).json({ message: 'Usuário não autenticado' });
        }
    }
}

export default new CommerceController();
