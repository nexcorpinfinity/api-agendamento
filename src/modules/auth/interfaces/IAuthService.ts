export interface IAuthService {
    auth(email: string, password: string, stay_connected: boolean): Promise<string | Error>;
}
