export interface IUserModel {
    isValidPassword: (password: string, hash: string) => boolean;
    hashPassword: (password: string) => string;
    findAll(): void;
}
