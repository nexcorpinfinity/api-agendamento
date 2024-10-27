import { BusinessEntity } from '../entities/BusinessEntity';

export interface IBusinessRepository {
    createBusiness(nameBusiness: string, idUser: string): Promise<BusinessEntity | Error>;
}
