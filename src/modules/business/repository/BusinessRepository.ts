import { emitConsole } from '../../../utils/ConsoleDevelopment';
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
            emitConsole(error);
            throw new Error('Error criar business');
        }
    }

    public async getAllBusinessByIdUser(idUser: string): Promise<BusinessEntity | null> {
        try {
            const data = await this.business.findOne({
                where: {
                    user_id: idUser,
                },
            });

            return data?.dataValues;
        } catch (error) {
            emitConsole(error);
            throw new Error('Error criar business');
        }
    }

    public async getIdBusinessWithIdUser(idUser: string): Promise<string | Error> {
        try {
            const data = await this.business.findOne({
                where: {
                    user_id: idUser,
                },
            });

            return data?.dataValues.id;
        } catch (error) {
            emitConsole(error);
            throw new Error('Error ao buscar Business ou business não existe.');
        }
    }
}
