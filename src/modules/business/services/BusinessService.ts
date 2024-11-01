import { emitConsole } from '../../../utils/ConsoleDevelopment';
import { IUserRepository } from '../../users/interfaces/IUserRepository';
import { IBusinessRepository } from '../interface/IBusinessRepository';
import { IBusinessService } from '../interface/IBusinessService';

export class BusinessService implements IBusinessService {
    public constructor(
        private readonly businessRepository: IBusinessRepository,
        private readonly userRepository: IUserRepository,
    ) {}

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public async getAlldataBusinessAndUser(idUser: string) {
        try {
            const getDataUser = await this.userRepository.getDataByUser(idUser);

            if (!getDataUser) {
                throw new Error('Usuário não encontrado');
            }

            const getDataBusiness = await this.businessRepository.getAllBusinessByIdUser(idUser);

            if (!getDataBusiness) {
                return getDataUser;
            }

            const merged = {
                id: getDataUser.id,
                name: getDataUser.name,
                email: getDataUser.email,
                permission: getDataUser.permission,
                business: getDataBusiness,
            };

            console.log(merged);

            return merged;
        } catch (error) {
            emitConsole(error);
            throw new Error('Error ao trazer dados');
        }
    }
}
