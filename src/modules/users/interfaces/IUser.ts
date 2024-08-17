export interface IUser {
    id?: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    roles?: string;
    createdAt?: Date;
    updatedAt?: Date;
    Comercio?: [];
}

export interface IUserEmpresarial extends IUser {
    cpfCnpj: string;
}
