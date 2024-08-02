import { User } from '../entities/User';
import { IUser } from '../interfaces/IUser';

class UserRepository {
    async createUserNormal(first_name: string, last_name: string, email: string, password: string) {
        try {
            const usuarioRecebido: IUser = { first_name, last_name, email, password };

            await User.create(usuarioRecebido);

            return { mensagem: 'Cadastrado feito com sucesso', userCreated: { first_name, email } };
        } catch (error) {
            throw new Error(`Não foi possivel fazer o cadastro do Usuário: ${error}`);
        }
    }

    async findByEmailAuth(emailParam: string) {
        try {
            const user = await User.findOne({
                where: { email: emailParam },
            });

            if (!user) return null;

            const data = user.dataValues;

            const { id, first_name, email, password, roles } = data;

            return { id, first_name, email, password, roles };
        } catch (error) {
            throw new Error(`Unable to find user: ${error}`);
        }
    }

    // async createUserCorporativo(name: string, email: string, password: string, cpfCnpj: string) {
    //     try {
    //         console.log('cheguei no repository: ');

    //         const usuarioRecebido = { name, email, password, cpfCnpj };

    //         const user = await User.create(usuarioRecebido);

    //         console.log(user);

    //         return user;
    //     } catch (error) {
    //         throw new Error(`Unable to create user: ${error}`);
    //     }
    // }

    // async createUserAdmin(name: string, email: string, password: string) {
    //     try {
    //         console.log('cheguei no repository: ');

    //         const usuarioRecebido = { name, email, password };

    //         const user = await User.create(usuarioRecebido);

    //         console.log(user);

    //         return user;
    //     } catch (error) {
    //         throw new Error(`Unable to create user: ${error}`);
    //     }
    // }

    // async update(userId: number, updateData: Partial<IUser>) {
    //     try {
    //         await User.update(updateData, {
    //             where: { id: userId },
    //         });
    //         const updatedUser = await User.findByPk(userId);
    //         return updatedUser;
    //     } catch (error) {
    //         throw new Error(`Unable to update user: ${error}`);
    //     }
    // }

    // async delete(userId: number) {
    //     try {
    //         const result = await User.destroy({
    //             where: { id: userId },
    //         });
    //         return result;
    //     } catch (error) {
    //         throw new Error(`Unable to delete user: ${error}`);
    //     }
    // }
}

export default new UserRepository();
