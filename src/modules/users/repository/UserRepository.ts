import { emitConsole } from '../../../utils/ConsoleDevelopment';
import { UserEntity } from '../entities/UserEntity';
import { Permissions } from '../interfaces/EnumPermissions';
import { IUser } from '../interfaces/IUser';
import { IUserRepository } from '../interfaces/IUserRepository';

class UserRepository implements IUserRepository {
    public constructor(private readonly userEntity = UserEntity) {}

    public async createUser(
        received_name: string,
        received_email: string,
        received_password: string,
        received_photo: string,
        received_number_phone: string,
        received_api_key: string,
        received_permission: Permissions = Permissions.Client,
    ): Promise<{ id: string; name: string; email: string; permission: string } | Error> {
        try {
            const user = await this.userEntity.create({
                name: received_name,
                email: received_email,
                password: received_password ?? null,
                permission: received_permission,
                photo: received_photo ?? null,
                number_phone: received_number_phone ?? null,
                api_key: received_api_key,
            });

            const userData = user.get({ plain: true });

            const id = userData.id ?? '';
            const name = userData.name ?? '';
            const email = userData.email ?? '';
            const permission = userData.permission ?? '';

            return { id, name, email, permission };
        } catch (error) {
            emitConsole(error);
            return new Error('Erro ao criar usuário');
        }
    }

    public async findByEmail(emailReceived: string): Promise<IUser | undefined> {
        try {
            const user = await this.userEntity.findOne({
                where: {
                    email: emailReceived,
                },
            });

            return user?.dataValues;
        } catch (error) {
            emitConsole(error);
            throw new Error('Erro ao buscar usuário');
        }
    }

    public async verifyEmailExists(emailReceived: string): Promise<boolean> {
        try {
            const verify = await this.userEntity.findOne({
                where: {
                    email: emailReceived,
                },
            });

            return !!verify;
        } catch (error) {
            emitConsole(error);
            throw new Error('Erro ao verificar email');
        }
    }

    public async getAllDataUser(emailReceived: string): Promise<IUser | undefined> {
        try {
            const data = await this.userEntity.findOne({ where: { email: emailReceived } });

            return data?.dataValues;
        } catch (error) {
            emitConsole(error);
            throw new Error('Erro ao buscar dados do usuário');
        }
    }

    public async getDataByUser(idUser: string): Promise<IUser | undefined> {
        try {
            const data = await this.userEntity.findOne({
                where: {
                    id: idUser,
                },
            });

            return data?.dataValues;
        } catch (error) {
            emitConsole(error);
            throw new Error('Erro ao buscar dados do usuário');
        }
    }
}
export { UserRepository };
