import { Request, Response } from 'express';

import { ResponseHandler } from '../../../config/ResponseHTTP/ResponseHTTP';
import { IAuthService } from '../interfaces/IAuthService';

export class AuthController {
    public constructor(private readonly authService: IAuthService) {}

    public async auth(
        req: Request,
        res: Response,
    ): Promise<Response<string, Record<string, string>>> {
        const { email, password, stay_connected } = req.body;

        try {
            const authSession = await this.authService.auth(email, password, stay_connected);

            if (!authSession) {
                return ResponseHandler.error(res, 401, 'Erro ao fazer login');
            }

            if (authSession instanceof Error) {
                return ResponseHandler.error(res, 401, authSession.message);
            }

            return ResponseHandler.success(
                res,
                200,
                { token: authSession },
                'Login feito com sucesso.',
            );
        } catch (error) {
            return ResponseHandler.error(res, 500);
        }
    }
}
