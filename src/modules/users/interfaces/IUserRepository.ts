import { Permissions } from './EnumPermissions';
import { IUser } from './IUser';

export interface IUserRepository {
    createUser(
        received_name: string,
        received_email: string,
        received_password: string | null,
        received_photo: string,
        received_number_phone: string | null,
        received_api_key: string,
        received_permission: Permissions,
    ): Promise<{ id: string; name: string; email: string; permission: string } | Error>;

    verifyEmailExists(emailReceived: string): Promise<boolean>;
    getAllDataUser(emailReceived: string): Promise<IUser | undefined>;
    getDataByUser(idUser: string): Promise<IUser | undefined>;
    findByEmail(emailReceived: string): Promise<IUser | undefined>;
}
