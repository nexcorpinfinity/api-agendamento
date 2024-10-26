export interface IUser {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    photo?: string;
    number_phone?: string;
    permission?: Permission;
    api_key?: string;
    create_at?: Date;
    update_at?: Date;
}

export enum Permission {
    Admin = 'admin',
    Costumer = 'costumer',
    Client = 'client',
}
