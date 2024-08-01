export interface IUser {
    id?: number;
    name: string;
    email: string;
    password: string;
    permission?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUserEmpresarial extends IUser {
    cpfCnpj: string;
}
