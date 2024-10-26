/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import { ResponseHandler } from '../../../config/ResponseHTTP/ResponseHTTP';
import { IUserController } from '../interfaces/IUserController';
import { IUserService } from '../interfaces/IUserService';

export class UserController implements IUserController {
    public constructor(private readonly userService: IUserService) {}

    public async createAdminUser(
        req: Request,
        res: Response,
    ): Promise<Response<string, Record<string, string>>> {
        try {
            const { name, email, password, photo, number_phone } = req.body;

            const result = await this.userService.createUserAdmin(
                name,
                email,
                password,
                photo,
                number_phone,
            );

            if (!result) {
                return ResponseHandler.error(res, 400, 'Erro ao usuário cliente');
            }

            if (result instanceof Error) {
                return ResponseHandler.error(res, 400, result.message);
            }

            return ResponseHandler.success(
                res,
                201,
                result,
                'Usuario cliente criado com sucesso',
            );
        } catch (error) {
            console.log(error);
            return ResponseHandler.error(res, 500);
        }
    }
    public async createBusinessUser(
        req: Request,
        res: Response,
    ): Promise<Response<string, Record<string, string>>> {
        try {
            const { name, email, password, photo, number_phone } = req.body;

            const result = await this.userService.createUserBusiness(
                name,
                email,
                password,
                photo,
                number_phone,
            );

            console.log(result);

            if (!result) {
                return ResponseHandler.error(res, 400, 'Erro ao usuário cliente');
            }

            if (result instanceof Error) {
                return ResponseHandler.error(res, 400, result.message);
            }

            return ResponseHandler.success(
                res,
                201,
                result,
                'Usuario cliente criado com sucesso',
            );
        } catch (error) {
            console.log(error);
            return ResponseHandler.error(res, 500);
        }
    }
    public async createClientUser(
        req: Request,
        res: Response,
    ): Promise<Response<string, Record<string, string>>> {
        try {
            const { name, email, password, photo, number_phone } = req.body;

            const result = await this.userService.createUserClient(
                name,
                email,
                password,
                photo,
                number_phone,
            );

            if (!result) {
                return ResponseHandler.error(res, 400, 'Erro ao usuário cliente');
            }

            if (result instanceof Error) {
                return ResponseHandler.error(res, 400, result.message);
            }

            return ResponseHandler.success(
                res,
                201,
                result,
                'Usuario cliente criado com sucesso',
            );
        } catch (error) {
            console.log(error);
            return ResponseHandler.error(res, 500);
        }
    }
}
