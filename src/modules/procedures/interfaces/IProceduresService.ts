import { ProceduresEntity } from '../entities/ProceduresEntity';

export interface IProceduresService {
    createdNewProcedure(
        name: string,
        description: string,
        price: number,
        duration: number,
        business_id: string,
    ): Promise<ProceduresEntity | Error>;
}
