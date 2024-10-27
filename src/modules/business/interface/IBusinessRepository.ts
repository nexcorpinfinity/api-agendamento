export interface IBusinessRepository {
    createBusiness(
        nameBusiness: string,
        idUser: string,
    ): Promise<{ id: string; name: string } | Error>;
}
