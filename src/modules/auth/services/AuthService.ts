import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import { IBusinessRepository } from '../../business/interface/IBusinessRepository';
import { IUserRepository } from '../../users/interfaces/IUserRepository';
import { IAuthService } from '../interfaces/IAuthService';

export class AuthService implements IAuthService {
    public constructor(
        private userRepository: IUserRepository,
        private readonly businessRepository: IBusinessRepository,
    ) {}

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

            const { id } = getDataUser;

            const getIdBusiness = await this.businessRepository.getIdBusinessWithIdUser(String(id));

            const token = await this.generateToken(
                String(id),
                String(getDataUser.name),
                String(getIdBusiness),
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
        id: string,
        name: string,
        businessId: string,
        permission: string,
        stay_connected: boolean,
    ): Promise<string | Error> {
        try {
            const expiration = stay_connected ? '5d' : process.env.TOKEN_EXPIRATION;

            const jti = uuidv4();

            const token = jwt.sign(
                {
                    id,
                    businessId,
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
