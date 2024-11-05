/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProcedureCategoryEntity } from '../entities/ProcedureCategoryEntity';
import { ProceduresEntity } from '../entities/ProceduresEntity';
import { IProceduresCategoryRepository } from '../interfaces/IProceduresCategoryRepository';
import { IProceduresRepository } from '../interfaces/IProceduresRepository';
import { IProceduresService } from '../interfaces/IProceduresService';
import { IUpdateProcedureData } from '../interfaces/IUpdateProcedureData';

export class ProceduresService implements IProceduresService {
    public constructor(
        private readonly proceduresRepository: IProceduresRepository,
        private readonly proceduresCategoryRepository: IProceduresCategoryRepository,
    ) {}

    public async gellAllProceduresByBusiness(idBusiness: string): Promise<ProceduresEntity[]> {
        try {
            const procedures =
                await this.proceduresRepository.getAllProceduresByBusiness(idBusiness);

            return procedures;
        } catch (error: any) {
            console.log(error);
            throw new Error(error.message);
        }
    }

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

    public async updateProcedure(
        name: string | undefined,
        description: string | undefined,
        duration: string | number | undefined,
        price: string | number | undefined,
        idProcedure: string,
        procedures_categories_id: string | undefined,
    ): Promise<ProceduresEntity | Error | boolean> {
        try {
            const existingProcedure =
                await this.proceduresRepository.verifyExistsProcedureById(idProcedure);
            if (!existingProcedure) {
                return new Error('Procedimento não encontrado');
            }

            const updateData: Partial<IUpdateProcedureData> = {
                updated_at: new Date(),
            };

            if (name !== undefined && name !== '') {
                updateData.name = name;
            }

            if (description !== undefined && description !== '') {
                updateData.description = description;
            }

            if (duration !== undefined && duration !== '') {
                const parsedDuration = parseFloat(duration as string);
                if (!isNaN(parsedDuration)) {
                    updateData.duration = parsedDuration;
                }
            }

            if (price !== undefined && price !== '') {
                const parsedPrice = parseFloat(price as string);
                if (!isNaN(parsedPrice)) {
                    updateData.price = parsedPrice;
                }
            }

            if (procedures_categories_id !== undefined && procedures_categories_id !== '') {
                updateData.procedures_categories_id = procedures_categories_id;
            }

            if (Object.keys(updateData).length === 1) {
                return existingProcedure;
            }

            const updatedProcedure = await this.proceduresRepository.updateProcedure(
                idProcedure,
                updateData,
            );

            if (!updatedProcedure) {
                return new Error('Erro ao atualizar o procedimento, não foi encontrado.');
            }

            return updatedProcedure;
        } catch (error: any) {
            console.error(error);
            throw new Error('Erro ao atualizar o procedimento');
        }
    }

    public async deleteProcedure(idProcedure: string): Promise<boolean | Error> {
        try {
            const verifyExist =
                await this.proceduresRepository.verifyExistsProcedureById(idProcedure);

            if (!verifyExist) {
                return new Error('Procedimento não encontrado');
            }

            return this.proceduresRepository.deleteProcedure(idProcedure);
        } catch (error: any) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    public async createdNewProcedureCategory(
        name: string,
        business_id: string,
    ): Promise<ProcedureCategoryEntity | Error> {
        try {
            const verifyExists =
                await this.proceduresCategoryRepository.verifyExistsProcedureCategoryByName(
                    name,
                    business_id,
                );

            if (verifyExists) {
                return new Error('Já existe um procedimento com esse nome');
            }

            const created = await this.proceduresCategoryRepository.createProcedureCategory(
                name,
                business_id,
            );

            return created;
        } catch (error: any) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    public async gellAllProceduresCategoryByBusiness(
        idBusiness: string,
    ): Promise<ProcedureCategoryEntity[]> {
        try {
            const procedures =
                await this.proceduresCategoryRepository.getAllProceduresCategoryByBusiness(
                    idBusiness,
                );

            return procedures;
        } catch (error: any) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    public async updateProcedureCategory(
        name: string | undefined,
        idProcedureCategory: string,
    ): Promise<ProcedureCategoryEntity | Error | boolean> {
        try {
            const existingProcedure =
                await this.proceduresCategoryRepository.verifyExistsProcedureCategoryById(
                    idProcedureCategory,
                );
            if (!existingProcedure) {
                return new Error('Procedimento não encontrado');
            }

            if (!name || name.trim() === '') {
                return new Error('Nome do procedimento não pode estar vazio');
            }

            const updatedProcedure = await this.proceduresCategoryRepository.editProcedureCategory(
                idProcedureCategory,
                String(name),
            );

            if (!updatedProcedure) {
                return new Error('Erro ao atualizar o procedimento, não foi encontrado.');
            }

            return updatedProcedure;
        } catch (error: any) {
            console.error(error);
            throw new Error('Erro ao atualizar o procedimento');
        }
    }

    public async deleteProcedureCategory(idProcedureCategory: string): Promise<boolean | Error> {
        try {
            const verifyExist =
                await this.proceduresCategoryRepository.verifyExistsProcedureCategoryById(
                    idProcedureCategory,
                );

            if (!verifyExist) {
                return new Error('Categoria não encontrado');
            }

            return this.proceduresCategoryRepository.deleteProcedureCategory(idProcedureCategory);
        } catch (error: any) {
            console.log(error);
            throw new Error(error.message);
        }
    }
}
