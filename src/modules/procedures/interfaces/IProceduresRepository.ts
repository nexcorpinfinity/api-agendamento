import { ProceduresEntity } from '../entities/ProceduresEntity';

import { IUpdateProcedureData } from './IUpdateProcedureData';

export interface IProceduresRepository {
    createProcedure(
        name: string,
        description: string,
        duration: number,
        price: number,
        business_id: string,
    ): Promise<ProceduresEntity> | Error;
    verifyExistsProcedureByName(name: string, business_id: string): Promise<boolean>;
    updateProcedure(
        procedureId: string,
        updateData: Partial<IUpdateProcedureData>,
    ): Promise<ProceduresEntity | null>;
    verifyExistsProcedureById(idProcedure: string): Promise<boolean>;
    deleteProcedure(procedureId: string): Promise<boolean>;
    getAllProceduresByBusiness(business_id: string): Promise<ProceduresEntity[]>;
}
