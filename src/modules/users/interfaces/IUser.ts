import { Permissions } from './EnumPermissions';

export interface IUser {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    photo?: string;
    number_phone?: string;
    permission?: Permissions;
    api_key?: string;
    create_at?: Date;
    update_at?: Date;
}
