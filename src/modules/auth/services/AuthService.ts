import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import { IUserRepository } from '../../users/interfaces/IUserRepository';
import { IAuthService } from '../interfaces/IAuthService';

export class AuthService implements IAuthService {
    public constructor(private userRepository: IUserRepository) {}

    public async auth(
        email: string,
        password: string,
        stay_connected: boolean,
    ): Promise<string | Error> {
        try {
            const verifyExistEmailUser = await this.userRepository.verifyEmailExists(email);

            if (verifyExistEmailUser === false) {
                throw new Error('Email informado não existe.');
            }

            const getDataUser = await this.userRepository.getAllDataUser(email);

            console.log(getDataUser);

            if (getDataUser === undefined || getDataUser === null) {
                throw new Error('Erro ao trazer dados do usuário');
            }

            const checkPassValid = await this.verifyPasswordAndCompare(
                password,
                String(getDataUser?.password),
            );

            if (checkPassValid === false) {
                throw new Error('Senha inválida');
            }

            const token = await this.generateToken(
                Number(getDataUser.id),
                String(getDataUser.name),
                String(getDataUser.permission),
                Boolean(stay_connected),
            );

            return String(token);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return new Error(error.message);
        }
    }

    private async verifyPasswordAndCompare(
        password: string,
        hashPassword: string,
    ): Promise<boolean> {
        return await bcrypt.compare(password, hashPassword);
    }

    private async generateToken(
        id: number,
        name: string,
        permission: string,
        stay_connected: boolean,
    ): Promise<string | Error> {
        try {
            const expiration = stay_connected ? '5d' : process.env.TOKEN_EXPIRATION;

            const jti = uuidv4();
            console.log(jti);

            const token = jwt.sign(
                {
                    id,
                    name,
                    permission,
                    jti,
                },
                process.env.TOKEN_SECRET as string,
                {
                    expiresIn: expiration,
                },
            );

            return token;
        } catch (error) {
            return new Error('Erro ao gerar token');
        }
    }
}
