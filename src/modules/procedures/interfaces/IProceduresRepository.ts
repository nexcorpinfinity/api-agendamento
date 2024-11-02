import { ProceduresEntity } from '../entities/ProceduresEntity';

export interface IProceduresRepository {
    createProcedure(
        name: string,
        description: string,
        duration: number,
        price: number,
        business_id: string,
    ): Promise<ProceduresEntity> | Error;
    verifyExistsProcedureByName(name: string, business_id: string): Promise<boolean>;
}
