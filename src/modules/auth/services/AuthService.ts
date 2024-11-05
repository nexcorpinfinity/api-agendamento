import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import { IBusinessRepository } from '../../business/interface/IBusinessRepository';
import { Permissions } from '../../users/interfaces/EnumPermissions';
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async authWithGoogle(profile: any, state: string): Promise<string | Error> {
        try {
            if (typeof profile === 'string') {
                profile = JSON.parse(profile);
            }

            // console.log('authWithGOogle', profile);

            const { name, picture, email } = profile;

            // console.log('idgoogle', profile.sub);

            const existingUser = await this.userRepository.findByEmail(profile.email);

            // console.log('existingUser', existingUser);

            const apiKey = this.generateApiKey();

            if (!existingUser) {
                // Verifica se existingUser é undefined ou null
                if (state === 'client') {
                    const newUser = await this.userRepository.createUser(
                        name,
                        email,
                        null,
                        picture,
                        null,
                        apiKey,
                        Permissions.Client,
                    );

                    console.log('newUser', newUser);
                    if (newUser instanceof Error) {
                        return newUser;
                    }

                    const { id, name: nameNew, permission } = newUser;

                    // Token de primerio cadastro no front precisa validar para pedir um numero de celular e uma senha
                    return jwt.sign(
                        {
                            id: id,
                            businessId: null,
                            name: nameNew,
                            permission: permission,
                            jti: uuidv4(),
                            setNewPhoneNumber: true,
                            setNewPass: true,
                        },
                        process.env.TOKEN_SECRET as string,
                        {
                            expiresIn: '1d',
                        },
                    );
                } else if (state === 'business') {
                    const newUser = await this.userRepository.createUser(
                        name,
                        email,
                        null,
                        picture,
                        null,
                        apiKey,
                        Permissions.Costumer,
                    );

                    if (newUser instanceof Error) {
                        return newUser;
                    }

                    const { id, name: nameNew, permission } = newUser;

                    //Token de primerio cadastro n0 front precisa validar para pedir uma senha, um numero de celular e o nome do comecio
                    return jwt.sign(
                        {
                            id: id,
                            businessId: null,
                            name: nameNew,
                            permission: permission,
                            jti: uuidv4(),
                            setNewPhoneNumber: true,
                            setNewPass: true,
                            setNameBusiness: true,
                        },
                        process.env.TOKEN_SECRET as string,
                        {
                            expiresIn: '1d',
                        },
                    );
                }
            } else {
                if (existingUser instanceof Error) {
                    return existingUser;
                }

                const { id, name, permission } = existingUser;
                console.log(id, name, permission);

                if (permission === Permissions.Costumer) {
                    const getIdBusiness = await this.businessRepository.getIdBusinessWithIdUser(
                        String(id),
                    );

                    // console.log('getIdBusiness', getIdBusiness);

                    if (getIdBusiness instanceof Error) {
                        return getIdBusiness;
                    }

                    return this.generateToken(
                        String(id),
                        String(name),
                        String(getIdBusiness),
                        String(permission),
                        true,
                    );
                } else if (permission === Permissions.Client) {
                    return this.generateToken(
                        String(id),
                        String(name),
                        null,
                        String(permission),
                        true,
                    );
                } else if (permission === Permissions.Admin) {
                    return this.generateToken(
                        String(id),
                        String(name),
                        null,
                        String(permission),
                        true,
                    );
                }
            }
            return new Error('Usuário não encontrado ou operação inválida');
        } catch (error) {
            return new Error('Erro ao autenticar com Google');
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
        businessId: string | null,
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

    private generateApiKey(): string {
        return uuidv4();
    }
}
