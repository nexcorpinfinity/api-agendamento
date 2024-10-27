import { BusinessEntity } from '../entities/BusinessEntity';
import { IBusinessRepository } from '../interface/IBusinessRepository';

export class BusinessRepository implements IBusinessRepository {
    public constructor(private readonly business = BusinessEntity) {}

    public async createBusiness(
        nameBusiness: string,
        idUser: string,
    ): Promise<{ id: string; name: string } | Error> {
        try {
            const business = await this.business.create({
                name: nameBusiness,
                user_id: idUser,
            });

            const businessData = business.get({ plain: true });

            const id = businessData.id ?? '';
            const name = businessData.name ?? '';

            return { id, name };
        } catch (error) {
            console.log(error);
            throw new Error('Error criar business');
        }
    }
}
