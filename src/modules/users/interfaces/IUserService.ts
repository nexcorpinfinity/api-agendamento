export interface IUserService {
    createUserClient(
        name: string,
        email: string,
        password: string,
        photo: string,
        number_phone: string,
    ): Promise<{ id: string; name: string; email: string } | Error>;

    createUserAdmin(
        name: string,
        email: string,
        password: string,
        photo: string,
        number_phone: string,
    ): Promise<{ id: string; name: string; email: string } | Error>;

    createUserBusiness(
        name: string,
        email: string,
        name_business: string,
        password: string,
        photo: string,
        number_phone: string,
        segment_type_id: string,
    ): Promise<{ id: string; name: string; email: string } | Error>;
}
