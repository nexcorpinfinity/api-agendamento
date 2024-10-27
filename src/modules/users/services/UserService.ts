/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { IBusinessRepository } from '../../business/interface/IBusinessRepository';
import { Permissions } from '../interfaces/EnumPermissions';
// import { IUser } from '../interfaces/IUser';
import { IUserRepository } from '../interfaces/IUserRepository';
import { IUserService } from '../interfaces/IUserService';

export default class UserService implements IUserService {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly businessRepository: IBusinessRepository,
    ) {}

    public async createUserClient(
        name: string,
        email: string,
        password: string,
        photo: string,
        number_phone: string,
    ): Promise<{ id: string; name: string; email: string } | Error> {
        try {
            const hashPassword = this.generateHashPassWord(String(password));

            const apiKey = this.generateApiKey();

            const verifyExistEmail = await this.userRepository.verifyEmailExists(email);

            if (verifyExistEmail === true) {
                return new Error('Email já existe');
            }

            const user = await this.userRepository.createUser(
                name,
                email,
                hashPassword,
                photo,
                number_phone,
                apiKey,
                Permissions.Client,
            );

            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async createUserBusiness(
        name: string,
        email: string,
        name_business: string,
        password: string,
        photo: string,
        number_phone: string,
    ): Promise<{ id: string; name: string; email: string } | Error> {
        try {
            const hashPassword = this.generateHashPassWord(String(password));

            const apiKey = this.generateApiKey();

            const verifyExistEmail = await this.userRepository.verifyEmailExists(email);

            if (verifyExistEmail === true) {
                return new Error('Email já existe');
            }

            const userResult = await this.userRepository.createUser(
                name,
                email,
                hashPassword,
                photo,
                number_phone,
                apiKey,
                Permissions.Costumer,
            );

            if (userResult instanceof Error) {
                console.error('Erro ao criar usuário:', userResult.message);
                return userResult;
            }

            const { id } = userResult;

            const result = await this.businessRepository.createBusiness(
                name_business,
                String(id),
            );

            if (result instanceof Error) {
                console.error('Erro ao criar usuário:');
                return result;
            }

            console.log(result);

            return userResult;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async createUserAdmin(
        name: string,
        email: string,
        password: string,
        photo: string,
        number_phone: string,
    ): Promise<{ id: string; name: string; email: string } | Error> {
        try {
            const hashPassword = this.generateHashPassWord(String(password));

            const apiKey = this.generateApiKey();

            const verifyExistEmail = await this.userRepository.verifyEmailExists(email);

            if (verifyExistEmail === true) {
                return new Error('Email já existe');
            }

            const user = await this.userRepository.createUser(
                name,
                email,
                hashPassword,
                photo,
                number_phone,
                apiKey,
                Permissions.Admin,
            );

            console.log(user);

            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    private generateHashPassWord(password: string): string {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(12));
    }

    private generateApiKey(): string {
        return uuidv4();
    }
}
