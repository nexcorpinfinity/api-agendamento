import { ErrorException } from '../../../utils/ErrorException';
import jwt from 'jsonwebtoken';
import UserRepository from '../../users/repository/UserRepository';
import { Request } from 'express';
import { receberIdPeloToken } from '../../../utils/DecodeToken';
import { User } from '../../users/entities/User';

interface UserLogged {
    id: string;
    permission: string[];
}
export default class AuthService {
    constructor() {}

    async autenticarUsuario(email: string, password: string) {
        const errors = [];

        if (!email || !password) {
            errors.push({ message: 'Campo Login e senha não informado', campo: 'Todos' });
        }

        //importar o validator para verificar o email
        // if (email) {
        //     errors.push({ message: 'Email invalido', campo: 'email' });
        // }

        // if (password.length <= 6) {
        //     errors.push({ message: 'Campo senha não pode ser menor que 6 caracteres', campo: 'password' });
        // }

        // faz uma consulta no banco com o email informado
        const user = await UserRepository.findByEmailAuth(email);

        console.log(user);

        if (!user) {
            errors.push({ message: 'Usuario não existente', campo: 'email' });
            throw new ErrorException(errors, 400);
        }

        const idUser: number | undefined = user.id;
        const nomeDoUsuario: string | undefined = user.first_name;
        const emailDoUsuario: string | undefined = user.email;
        const permission: string | undefined = user.roles;
        const senhaHash: string | undefined = user.password;

        const passwordIsValid = User.isValidPassword(password, senhaHash);

        if (passwordIsValid !== true) {
            errors.push({ message: 'Senha invalida', campo: 'password' });
        }

        if (errors.length > 0) {
            throw new ErrorException(errors, 400);
        }

        const token = jwt.sign({ idUser, nomeDoUsuario, emailDoUsuario, permission }, process.env.TOKEN_SECRET as string, {
            expiresIn: process.env.TOKEN_EXPIRATION,
        });

        console.log(token);

        return { token };
    }

    usuarioAutenticado(req: Request): UserLogged | undefined {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            console.error('O token é undefined');
            return undefined;
        }
        const token = authHeader.split(' ')[1];

        console.log(token);

        const userLogged = receberIdPeloToken(token);

        console.log(userLogged);

        if (!userLogged) {
            console.error('Falha ao decodificar o token');
            return undefined;
        }

        return userLogged;
    }
}