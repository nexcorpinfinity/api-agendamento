import { User } from '../entities/User';
import { IUser } from '../interfaces/IUser';

class UserRepository {
    async createUserNormal(first_name: string, last_name: string, email: string, password: string, roles: string) {
        try {
            const usuarioRecebido: IUser = { first_name, last_name, email, password, roles };

            if ((await this.validaEmailNoBanco(usuarioRecebido.email)) === true) return 'Email ja existe';

            await User.create(usuarioRecebido);

            return { mensagem: 'Usuario created ', userCreated: { first_name, email } };
        } catch (error) {
            throw new Error(`Não foi possivel fazer o cadastro do Usuário: ${error}`);
        }
    }

    async createUserAdminG(first_name: string, last_name: string, email: string, password: string, roles: string) {
        try {
            const usuarioRecebido: IUser = { first_name, last_name, email, password, roles };

            console.log(usuarioRecebido);

            this.validaEmailNoBanco(usuarioRecebido.email);

            await User.create(usuarioRecebido);

            return { mensagem: 'Admin created', userCreated: { first_name, email } };
        } catch (error) {
            // console.log(error);
            throw new Error(`Não foi possivel fazer o cadastro do Usuário: ${error}`);
        }
    }

    async validaEmailNoBanco(emailParam: string) {
        const user = await User.findOne({
            where: { email: emailParam },
        });

        if (user) {
            return true;
        } else {
            return false;
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
}

export default new UserRepository();
