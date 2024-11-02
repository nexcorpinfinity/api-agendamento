/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProceduresEntity } from '../entities/ProceduresEntity';
import { IProceduresRepository } from '../interfaces/IProceduresRepository';
import { IProceduresService } from '../interfaces/IProceduresService';

export class ProceduresService implements IProceduresService {
    public constructor(private readonly proceduresRepository: IProceduresRepository) {}

    public async createdNewProcedure(
        name: string,
        description: string,
        price: number,
        duration: number,
        business_id: string,
    ): Promise<ProceduresEntity | Error> {
        try {
            const verifyExists = await this.proceduresRepository.verifyExistsProcedureByName(
                name,
                business_id,
            );

            if (verifyExists) {
                return new Error('Já existe um procedimento com esse nome');
            }

            const created = await this.proceduresRepository.createProcedure(
                name,
                description,
                duration,
                price,
                business_id,
            );

            return created;
        } catch (error: any) {
            console.log(error);
            throw new Error(error.message);
        }
    }
}
