import { ErrorException } from '../../../utils/ErrorException';
import { IUser } from '../model/interfaces/IUser';
import UserRepository from '../model/repository/UserRepository';

export default class UserService {
    async createUserNormal(userData: IUser) {
        const errors = [];

        if (!userData.first_name || !userData.last_name || !userData.email || !userData.password) {
            errors.push({ message: 'Todos os campos é requerido', campo: 'Todos' });
        }
        if (userData.first_name.length < 3) {
            errors.push({ message: 'Campo nome não pode ser menor que 3 caracteres', campo: 'name' });
        }
        if (userData.last_name.length < 3) {
            errors.push({ message: 'Campo nome não pode ser menor que 3 caracteres', campo: 'name' });
        }
        if (userData.email.length < 3) {
            errors.push({ message: 'Campo email não pode ser menor que 3 caracteres', campo: 'email' });
        }
        if (userData.password.length < 3) {
            errors.push({ message: 'Campo password não pode ser menor que 3 caracteres', campo: 'password' });
        }

        if (errors.length > 0) {
            throw new ErrorException(errors, 400);
        }
        const user = await UserRepository.createUserNormal(userData.first_name, userData.last_name, userData.email, userData.password);

        return user;
    }

    // async createUserEmpresarial(userData: IUserEmpresarial) {
    //     if (!userData.name || !userData.email || !userData.password || !userData.cpfCnpj) {
    //         throw new Error('All campos are required');
    //     }

    //     const user = await UserRepository.createUserCorporativo(userData.name, userData.email, userData.password, userData.cpfCnpj);
    //     return user;
    // }

    // async createUserAdmin(userData: IUser) {
    //     if (!userData.name || !userData.email || !userData.password || !userData.permission) {
    //         throw new Error('All fields are required');
    //     }

    //     console.log('vindo do service: ', userData);

    //     const user = await UserRepository.createUserAdmin(userData.name, userData.email, userData.password);
    //     return user;
    // }

    // async findById(userId: number) {
    //     const user = await UserRepository.findById(userId);
    //     if (!user) {
    //         throw new Error('User not found');
    //     }
    //     return user;
    // }

    // async update(userId: number, updateData: Partial<IUser>) {
    //     if (!userId) {
    //         throw new Error('User ID is required');
    //     }

    //     const updatedUser = await UserRepository.update(userId, updateData);
    //     return updatedUser;
    // }

    // async delete(userId: number) {
    //     if (!userId) {
    //         throw new Error('User ID is required');
    //     }

    //     const result = await UserRepository.delete(userId);
    //     return result;
    // }
}
