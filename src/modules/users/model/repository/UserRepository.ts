import { User } from '../entities/User';

class UserRepository {
    async createUserNormal(name: string, email: string, password: string) {
        try {
            const usuarioRecebido = { name, email, password };

            await User.create(usuarioRecebido);

            return { mensagem: 'Cadastrado feito com sucesso', userCreated: { name, email } };
        } catch (error) {
            throw new Error(`Não foi possivel fazer o cadastro do Usuário: ${error}`);
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

    // async findById(userId: number) {
    //     try {
    //         const user = await User.findByPk(userId);
    //         return user;
    //     } catch (error) {
    //         throw new Error(`Unable to find user: ${error}`);
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
