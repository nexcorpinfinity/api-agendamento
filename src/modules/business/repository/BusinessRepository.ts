import { BusinessEntity } from '../entities/BusinessEntity';
import { IBusinessRepository } from '../interface/IBusinessRepository';

export class BusinessRepository implements IBusinessRepository {
    public constructor(private readonly business = BusinessEntity) {}

    public async createBusiness(
        nameBusiness: string,
        idUser: string,
    ): Promise<{ id: string; name: string } | Error> {
        try {
            const { dataValues } = await this.business.create({
                name: nameBusiness,
                user_id: idUser,
            });

            const id = dataValues.id;
            const name = dataValues.name;

            return { id, name };
        } catch (error) {
            console.log(error);
            throw new Error('Error criar business');
        }
    }
}
