/* eslint-disable @typescript-eslint/no-explicit-any */
// import { ErrorException } from '../../../utils/ErrorException';

import validator from 'validator';
// import { IUser } from '../interfaces/IUser';
import { UserRepository } from '../repository/UserRepository';
// import { ErrorsProtocol } from '../interfaces/IUser';
import { BusinessRepository } from '../../business/repository/BusinessRepository';
// import { Role } from '../../../types/Enums';

export interface IUserService {
    createUserNormal(userData: any): Promise<any>;
}

export default class UserService implements IUserService {
    private readonly userRepository: UserRepository;
    private readonly businessRepository: BusinessRepository;

    constructor() {
        this.userRepository = new UserRepository();
        this.businessRepository = new BusinessRepository();
    }

    async createUserNormal(userData: any) {
        // console.log(userData);

        const name = userData.name?.trim() || '';
        const lastName = userData.last_name?.trim() || '';
        const name_business = userData.last_name?.trim() || '';
        const email = userData.email?.trim() || '';
        const password = userData.password?.trim() || '';

        // falta rececber o nome do comercio e criar um
        // criar o business
        // setar o plano

        if (!name || !lastName || !name_business || !email || !password) {
            throw new Error('Campos não pode ficar vazio ');
        }

        if (!validator.isEmail(email)) {
            throw new Error('Email invalido');
        }

        if (await this.userRepository.validaEmailNoBanco(email)) {
            throw new Error('Email já existe');
        }

        const user = await this.userRepository.createUserNormal(name, lastName, email, password);

        //validacao de erro

        const createdCommerce = await this.businessRepository.createBusinessWithUser(String(user.userCreated.id), name_business);

        console.log(createdCommerce, 'daugd9ua818u3412');

        return user;
    }

    public validateEmptyField(value: string, fieldName: string, errors: any[]) {
        if (value === '') {
            errors.push({ message: `Campo ${fieldName} não pode ficar vazio`, campo: fieldName });
        }
    }

    // async createUserAdminGlobal(userData: IUser) {
    //     const errors: any = [];

    //     const name = userData.name?.trim() || '';
    //     const lastName = userData.last_name?.trim() || '';
    //     const email = userData.email?.trim() || '';
    //     const password = userData.password?.trim() || '';

    //     const fieldsToValidate = [
    //         { value: name, fieldName: 'Nome' },
    //         { value: lastName, fieldName: 'Sobrenome' },
    //         { value: email, fieldName: 'Email' },
    //         { value: password, fieldName: 'Senha' },
    //     ];

    //     fieldsToValidate.forEach((field) => {
    //         this.validateEmptyField(field.value, field.fieldName, errors);
    //     });

    //     if (name.length < 3) {
    //         errors.push({ message: 'Campo nome não pode ser menor que 3 caracteres', campo: 'Nome' });
    //     }
    //     if (lastName.length < 3) {
    //         errors.push({ message: 'Campo sobrenome não pode ser menor que 3 caracteres', campo: 'Sobrenome' });
    //     }
    //     if (email.length < 3) {
    //         errors.push({ message: 'Campo email não pode ser menor que 3 caracteres', campo: 'Email' });
    //     }
    //     if (password.length < 3) {
    //         errors.push({ message: 'Campo password não pode ser menor que 3 caracteres', campo: 'Senha' });
    //     }
    //     if (!validator.isEmail(email)) {
    //         errors.push({ message: 'Email invalido', campo: 'email' });
    //     }
    //     if (await this.userRepository.validaEmailNoBanco(email)) {
    //         errors.push({ message: 'Email já existe', campo: 'email' });
    //     }

    //     if (errors.length > 0) {
    //         throw new ErrorException(errors, 400);
    //     }

    //     // const permission = Role.Admin;

    //     const user = await this.userRepository.createUserAdminG(name, lastName, email, password);

    //     return user;
    // }
}
