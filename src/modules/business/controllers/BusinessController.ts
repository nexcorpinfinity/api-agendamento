import { IBusinessController } from '../interface/IBusinessController';
import { IBusinessService } from '../interface/IBusinessService';

export class BusinessController implements IBusinessController {
    public constructor(private readonly businessService: IBusinessService) {}

    public async getAlldata(): Promise<void> {
        const a = await this.businessService.getAlldata();
        return a;
    }
}
