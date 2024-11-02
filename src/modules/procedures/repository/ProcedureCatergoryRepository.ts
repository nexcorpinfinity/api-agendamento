import { emitConsole } from '../../../utils/ConsoleDevelopment';
import { ProcedureCategoryEntity } from '../entities/ProcedureCategoryEntity';
import { IProceduresCategoryRepository } from '../interfaces/IProceduresCategoryRepository';

export class ProcedureCatergoryRepository implements IProceduresCategoryRepository {
    public constructor(private readonly proceduresCategoryEntity = ProcedureCategoryEntity) {}

    public async createProcedureCategory(
        name: string,
        business_id: string,
    ): Promise<ProcedureCategoryEntity> {
        try {
            const data = await this.proceduresCategoryEntity.create({
                name,
                business_id,
            });

            return data;
        } catch (error) {
            emitConsole(error);
            throw new Error('Erro ao criar caterogoria para o procedimento');
        }
    }

    public async verifyExistsProcedureCategoryByName(
        name: string,
        business_id: string,
    ): Promise<boolean> {
        try {
            const data = await this.proceduresCategoryEntity.findOne({
                where: {
                    name,
                    business_id,
                },
            });

            return !!data;
        } catch (error) {
            emitConsole(error);
            throw new Error('Erro ao verificar se existe caterogoria do procedimento por nome');
        }
    }

    public async verifyExistsProcedureCategoryById(idProcedureCategory: string): Promise<boolean> {
        try {
            const data = await this.proceduresCategoryEntity.findOne({
                where: {
                    id: idProcedureCategory,
                },
            });

            return !!data;
        } catch (error) {
            emitConsole(error);
            throw new Error('Erro ao verificar se existe procedimento por ID');
        }
    }

    public getAllProceduresCategoryByBusiness(
        business_id: string,
    ): Promise<ProcedureCategoryEntity[]> {
        try {
            const data = this.proceduresCategoryEntity.findAll({
                where: {
                    business_id,
                },
            });

            return data;
        } catch (error) {
            emitConsole(error);
            throw new Error('Erro ao buscar procedimentos');
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/explicit-function-return-type
    public async updateProcedureCategory(procedureCategoryId: string) {
        // try {
        //     await this.proceduresCategoryEntity.update(updateData, {
        //         where: { id: procedureId },
        //     });
        //     const updatedProcedure = await this.proceduresEntity.findByPk(procedureId);
        //     return updatedProcedure;
        // } catch (error) {
        //     console.log(error);
        //     throw new Error('Erro ao editar procedimentos');
        // }
    }

    public async deleteProcedureCategory(procedureCategoryId: string): Promise<boolean> {
        try {
            const bool = await this.proceduresCategoryEntity.destroy({
                where: { id: procedureCategoryId },
            });

            return !!bool;
        } catch (error) {
            console.log(error);
            throw new Error('Erro ao deletar categoria de procedimentos');
        }
    }
}
