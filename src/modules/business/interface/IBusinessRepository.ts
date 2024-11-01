import { BusinessEntity } from '../entities/BusinessEntity';

export interface IBusinessRepository {
    createBusiness(
        nameBusiness: string,
        idUser: string,
    ): Promise<{ id: string; name: string } | Error>;
    getAllBusinessByIdUser(idUser: string): Promise<BusinessEntity | null>;
}
