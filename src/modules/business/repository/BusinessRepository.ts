import { BusinessEntity } from '../entities/BusinessEntity';
import { IBusinessRepository } from '../interface/IBusinessRepository';

export class BusinessRepository implements IBusinessRepository {
    public constructor(private readonly business = BusinessEntity) {}

    public async createBusiness(
        nameBusiness: string,
        idUser: string,
    ): Promise<BusinessEntity | Error> {
        try {
            const create = await this.business.create({
                name: nameBusiness,
                user_id: idUser,
            });

            return create;
        } catch (error) {
            console.log(error);
            throw new Error('Error criar business');
        }
    }
}
