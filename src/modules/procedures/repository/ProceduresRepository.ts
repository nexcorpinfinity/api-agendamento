import { emitConsole } from '../../../utils/ConsoleDevelopment';
import { ProceduresEntity } from '../entities/ProceduresEntity';
import { IProceduresRepository } from '../interfaces/IProceduresRepository';

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
            throw new Error('Erro ao criar usuário');
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

    public async editProcedureByBusiness(
        procedureId: string,
        name: string,
        description: string,
        duration: number,
        price: number,
    ) {
        try {
            const updatedProcedure = await this.proceduresEntity.update(
                {
                    name: name,
                    description: description,
                    duration: duration,
                    price: price,
                },
                {
                    where: { id: procedureId },
                },
            );
            return updatedProcedure;
        } catch (error) {
            emitConsole(error);
            throw new Error('Erro ao editar procedimento');
        }
    }
}
