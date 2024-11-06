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

    public async authWithGoogle(
        req: Request,
        res: Response,
    ): Promise<void | Response<string, Record<string, string>>> {
        // const profile = req.user;
        const accountType = req.query.state as string;
        // cada auth via google no front tem q ter 2 caminho para cadastro um para comercio e outro para cliente pois pega pelo parametro esse state, parametro auth/google?accountType=client || auth/google?accountType=business

        console.log('accountType', accountType);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { _raw }: any = req.user;

        console.log(_raw);

        try {
            const authSession = await this.authService.authWithGoogle(_raw, accountType);

            console.log(authSession);

            if (!authSession) {
                return ResponseHandler.error(res, 401, 'Erro ao fazer login');
            }

            if (authSession instanceof Error) {
                return ResponseHandler.error(res, 401, authSession.message);
            }

            const token = authSession;
            const redirectUrl = `http://localhost:5173/auth/success?token=${token}`;

            return res.redirect(redirectUrl);
        } catch (error) {
            console.log(error);
            res.redirect('http://localhost:3000/error?error=authentication_failed');
        }
    }
}
