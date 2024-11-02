import { ProcedureCategoryEntity } from '../entities/ProcedureCategoryEntity';
import { ProceduresEntity } from '../entities/ProceduresEntity';

export interface IProceduresService {
    gellAllProceduresByBusiness(idBusiness: string): Promise<ProceduresEntity[]>;
    createdNewProcedure(
        name: string,
        description: string,
        price: number,
        duration: number,
        business_id: string,
    ): Promise<ProceduresEntity | Error>;
    updateProcedure(
        name: string | undefined,
        description: string | undefined,
        duration: string | number | undefined,
        price: string | number | undefined,
        idProcedure: string,
        procedures_categories_id: string | undefined,
    ): Promise<ProceduresEntity | Error | boolean>;
    deleteProcedure(idProcedure: string): Promise<boolean | Error>;
    createdNewProcedureCategory(
        name: string,
        business_id: string,
    ): Promise<ProcedureCategoryEntity | Error>;
}
