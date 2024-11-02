import { ProcedureCategoryEntity } from '../entities/ProcedureCategoryEntity';

export interface IProceduresCategoryRepository {
    createProcedureCategory(name: string, business_id: string): Promise<ProcedureCategoryEntity>;
    verifyExistsProcedureCategoryByName(name: string, business_id: string): Promise<boolean>;
    verifyExistsProcedureCategoryById(idProcedureCategory: string): Promise<boolean>;
    getAllProceduresCategoryByBusiness(business_id: string): Promise<ProcedureCategoryEntity[]>;
    deleteProcedureCategory(procedureCategoryId: string): Promise<boolean>;
    editProcedureCategory(
        procedureCategoryId: string,
        name: string,
    ): Promise<ProcedureCategoryEntity | null>;
}
