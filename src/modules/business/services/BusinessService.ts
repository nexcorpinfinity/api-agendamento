import { IBusinessRepository } from '../interface/IBusinessRepository';
import { IBusinessService } from '../interface/IBusinessService';

export default class BusinessService implements IBusinessService {
    public constructor(private readonly businessRepository: IBusinessRepository) {}

    public getAlldata(): void {
        const a = this.businessRepository;
        console.log(a);
        throw new Error('Method not implemented.');
    }
}
