/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import { ResponseHandler } from '../../../config/ResponseHTTP/ResponseHTTP';
import { IProceduresController } from '../interfaces/IProceduresController';
import { IProceduresService } from '../interfaces/IProceduresService';

export class ProceduresController implements IProceduresController {
    public constructor(private readonly proceduresService: IProceduresService) {}

    public async getallAndOneProcedures(
        req: Request,
        res: Response,
    ): Promise<Response<string, Record<string, string>>> {
        try {
            const businessId = req.params.business;

            const gellAll = await this.proceduresService.gellAllProceduresByBusiness(businessId);

            return ResponseHandler.success(
                res,
                200,
                gellAll,
                'Todos procedimentos retornados com sucesso',
            );
        } catch (error: any) {
            console.log(error);
            return ResponseHandler.error(res, 400, error.message);
        }
    }

    public async createOneProcedure(
        req: Request,
        res: Response,
    ): Promise<Response<string, Record<string, string>>> {
        try {
            const { name, description, duration, price } = req.body;

            const { businessId } = res.locals.user;

            const priceFixed = Number(price).toFixed(2);
            if (price.toString() !== priceFixed) {
                return ResponseHandler.error(
                    res,
                    400,
                    'O preço deve ter no máximo 2 casas decimais.',
                );
            }

            const created = await this.proceduresService.createdNewProcedure(
                name,
                description,
                duration,
                price,
                businessId,
            );

            if (!created) {
                return ResponseHandler.error(res, 400, 'Erro ao criar novo Procedimento ');
            }

            if (created instanceof Error) {
                return ResponseHandler.error(res, 400, created.message);
            }

            return ResponseHandler.success(res, 201, created, 'Procedimento criado com sucesso.');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error);
            return ResponseHandler.error(res, 400, error.message);
        }
    }

    public async editOneProcedure(
        req: Request,
        res: Response,
    ): Promise<Response<string, Record<string, string>>> {
        try {
            const idProcedure = req.params.id;

            if (!idProcedure) {
                ResponseHandler.error(res, 400, 'Id não informado');
            }

            const { name, description, duration, price, procedures_categories_id } = req.body;

            // console.log(idProcedure, name, description, duration, price, procedures_categories_id);

            const updated = await this.proceduresService.updateProcedure(
                String(name),
                String(description),
                Number(duration),
                String(price),
                String(idProcedure),
                String(procedures_categories_id),
            );

            if (updated instanceof Error) {
                return ResponseHandler.error(res, 400, updated.message);
            }

            console.log(updated);

            return ResponseHandler.success(
                res,
                200,
                updated,
                'Procedimento atualizado com sucesso.',
            );
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error);
            return ResponseHandler.error(res, 400, error.message);
        }
    }

    public async deleteOneProcedure(
        req: Request,
        res: Response,
    ): Promise<Response<string, Record<string, string>>> {
        try {
            const { id } = req.params;

            console.log(id);

            const deleted = await this.proceduresService.deleteProcedure(id);

            if (deleted instanceof Error) {
                return ResponseHandler.error(res, 400, deleted.message);
            }

            console.log(deleted);

            return ResponseHandler.success(res, 200, deleted, 'Procedimento deletado com sucesso.');
        } catch (error: any) {
            console.log(error);
            return ResponseHandler.error(res, 400, error.message);
        }
    }

    public async createCategoryForProcedure(
        req: Request,
        res: Response,
    ): Promise<Response<string, Record<string, string>>> {
        try {
            const { name } = req.body;

            const { businessId } = res.locals.user;
            console.log(businessId, name);

            const created = await this.proceduresService.createdNewProcedureCategory(
                String(name),
                String(businessId),
            );
            if (created instanceof Error) {
                return ResponseHandler.error(res, 400, created.message);
            }

            return ResponseHandler.success(res, 200, created, 'Categoria criada com sucesso.');
        } catch (error: any) {
            console.log(error);
            return ResponseHandler.error(res, 400, error.message);
        }
    }

    public async getAllCategoriesForProcedure(
        req: Request,
        res: Response,
    ): Promise<Response<string, Record<string, string>>> {
        try {
            const businessId = req.params.business;

            const categories =
                await this.proceduresService.gellAllProceduresCategoryByBusiness(businessId);

            if (categories instanceof Error) {
                return ResponseHandler.error(res, 400, categories.message);
            }

            return ResponseHandler.success(
                res,
                200,
                categories,
                'Categorias retornadas com sucesso.',
            );
        } catch (error: any) {
            console.log(error);
            return ResponseHandler.error(res, 400, error.message);
        }
    }

    public async editOneCategoryProcedure(
        req: Request,
        res: Response,
    ): Promise<Response<string, Record<string, string>>> {
        try {
            const { id } = req.params;

            const { name } = req.body;

            const updated = await this.proceduresService.updateProcedureCategory(String(name), id);

            if (updated instanceof Error) {
                return ResponseHandler.error(res, 400, updated.message);
            }

            console.log(updated);

            return ResponseHandler.success(
                res,
                200,
                updated,
                'Procedimento atualizado com sucesso.',
            );
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error);
            return ResponseHandler.error(res, 400, error.message);
        }
    }

    public async deleteOneCategoryProcedure(
        req: Request,
        res: Response,
    ): Promise<Response<string, Record<string, string>>> {
        try {
            const { id } = req.params;

            const deleted = await this.proceduresService.deleteProcedureCategory(id);

            if (deleted instanceof Error) {
                return ResponseHandler.error(res, 400, deleted.message);
            }

            console.log(deleted);

            return ResponseHandler.success(res, 200, deleted, 'Procedimento deletado com sucesso.');
        } catch (error: any) {
            console.log(error);
            return ResponseHandler.error(res, 400, error.message);
        }
    }
}
