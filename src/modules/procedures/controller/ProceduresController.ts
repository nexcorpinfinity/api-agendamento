import { Request, Response } from 'express';

import { ResponseHandler } from '../../../config/ResponseHTTP/ResponseHTTP';
import { IProceduresController } from '../interfaces/IProceduresController';
import { IProceduresService } from '../interfaces/IProceduresService';

export class ProceduresController implements IProceduresController {
    public constructor(private readonly proceduresService: IProceduresService) {}

    public getallAndOneProcedures(req: Request, res: Response): void {
        // para filtrar um procedimento por id pegar pelo req.query tipo no front na url vai ser /procedures?id=123123123
        // aqui no metoto pega por const {id} req.query;
        //
        this.proceduresService;
        res.json('ok');
    }

    public async createOneProcedure(req: Request, res: Response) {
        try {
            const { name, description, duration, price } = req.body;

            const { businessId } = res.locals.user;

            console.log('name', name);
            console.log('description', description);
            console.log('duration', duration);
            console.log('price', price);

            console.log('business_id', businessId);

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

    public editOneProcedure(req: Request, res: Response): void {
        const { id } = req.params;
        const { name, description, duration, price, business_id } = req.body;

        console.log(id, name, description, duration, price, business_id);

        // this.proceduresService.editProcedure(id, name, description, duration, price, business_id);

        res.json('ok');
    }

    public deleteOneProcedure(req: Request, res: Response): void {
        const { id } = req.params;

        console.log(id);

        // this.proceduresService.deleteProcedure(id);

        res.json('ok');
    }
}
