export interface IAuthService {
    auth(email: string, password: string, stay_connected: boolean): Promise<string | Error>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authWithGoogle(profile: any, state: string): Promise<string | Error>;
}
