/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express';

import { ResponseHandler } from '../../../config/ResponseHTTP/ResponseHTTP';
import { Permissions } from '../../users/interfaces/EnumPermissions';
import { IBusinessController } from '../interface/IBusinessController';
import { IBusinessService } from '../interface/IBusinessService';

export class BusinessController implements IBusinessController {
    public constructor(private readonly businessService: IBusinessService) {}

    public async getAlldataUserAndBusiness(req: Request, res: Response) {
        try {
            const { id, permission } = res.locals.user;

            if (permission === Permissions.Client) {
                return ResponseHandler.error(res, 400, 'Usuário não possui comercio');
            }

            const dados = await this.businessService.getAlldataBusinessAndUser(id);

            return ResponseHandler.success(res, 200, dados, 'Sucesso ao trazer dados');
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.error(res, 500, 'Erro ao trazer dados');
        }
    }
}
