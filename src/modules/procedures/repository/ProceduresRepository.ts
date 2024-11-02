import { emitConsole } from '../../../utils/ConsoleDevelopment';
import { ProceduresEntity } from '../entities/ProceduresEntity';
import { IProceduresRepository } from '../interfaces/IProceduresRepository';
import { IUpdateProcedureData } from '../interfaces/IUpdateProcedureData';

export class ProceduresRepository implements IProceduresRepository {
    public constructor(private readonly proceduresEntity = ProceduresEntity) {}

    public async createProcedure(
        name: string,
        description: string,
        duration: number,
        price: number,
        business_id: string,
    ): Promise<ProceduresEntity> {
        try {
            const data = await this.proceduresEntity.create({
                name,
                description,
                duration,
                price,
                business_id,
            });

            return data;
        } catch (error) {
            emitConsole(error);
            throw new Error('Erro ao criar procedimento');
        }
    }

    public async verifyExistsProcedureByName(name: string, business_id: string): Promise<boolean> {
        try {
            const data = await this.proceduresEntity.findOne({
                where: {
                    name,
                    business_id,
                },
            });

            return !!data;
        } catch (error) {
            emitConsole(error);
            throw new Error('Erro ao verificar se existe procedimento por nome');
        }
    }

    public async verifyExistsProcedureById(idProcedure: string): Promise<boolean> {
        try {
            const data = await this.proceduresEntity.findOne({
                where: {
                    id: idProcedure,
                },
            });

            return !!data;
        } catch (error) {
            emitConsole(error);
            throw new Error('Erro ao verificar se existe procedimento por ID');
        }
    }

    public getAllProceduresByBusiness(business_id: string): Promise<ProceduresEntity[]> {
        try {
            const data = this.proceduresEntity.findAll({
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

    public async updateProcedure(
        procedureId: string,
        updateData: Partial<IUpdateProcedureData>,
    ): Promise<ProceduresEntity | null> {
        try {
            await this.proceduresEntity.update(updateData, {
                where: { id: procedureId },
            });

            const updatedProcedure = await this.proceduresEntity.findByPk(procedureId);

            return updatedProcedure;
        } catch (error) {
            console.log(error);
            throw new Error('Erro ao editar procedimentos');
        }
    }

    public async deleteProcedure(procedureId: string): Promise<boolean> {
        try {
            const bool = await this.proceduresEntity.destroy({
                where: { id: procedureId },
            });

            return !!bool;
        } catch (error) {
            console.log(error);
            throw new Error('Erro ao deletar procedimentos');
        }
    }
}
