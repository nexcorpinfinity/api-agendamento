import { Permissions } from './EnumPermissions';
import { IUser } from './IUser';

export interface IUserRepository {
    createUser(
        received_name: string,
        received_email: string,
        received_password: string,
        received_photo: string,
        received_number_phone: string,
        received_api_key: string,
        received_permission: Permissions,
    ): Promise<{ id: string; name: string; email: string } | Error>;

    verifyEmailExists(emailReceived: string): Promise<boolean>;
    getAllDataUser(emailReceived: string): Promise<IUser | undefined>;
}
