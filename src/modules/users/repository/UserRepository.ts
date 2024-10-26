import { UserEntity } from '../entities/UserEntity';
import { Permissions } from '../interfaces/EnumPermissions';
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
    ): Promise<{ id: string; name: string; email: string } | Error> {
        try {
            const user = await this.userEntity.create({
                name: received_name,
                email: received_email,
                password: received_password,
                permission: received_permission,
                photo: received_photo ?? null,
                number_phone: received_number_phone ?? null,
                api_key: received_api_key,
            });

            const userData = user.get({ plain: true });

            const id = userData.id ?? '';
            const name = userData.name ?? '';
            const email = userData.email ?? '';

            return { id, name, email };
        } catch (error) {
            console.log(error);
            return new Error('Erro ao criar usuário');
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
            console.log(error);
            throw new Error('Erro ao verificar email');
        }
    }
}
export { UserRepository };
