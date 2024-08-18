/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import AuthService from '../services/AuthService';
import { ErrorException } from '../../../utils/ErrorException';

class AuthController {
    async store(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;
        console.log(req.body);
        if (!email || !password) {
            return res.status(401).json({ status: 400, errors: ['Credenciais inválidas'] });
        }

        try {
            const tokenReturn = await new AuthService().autenticarUsuario(email, password);

            if (tokenReturn === null) {
                return res.status(401).json({ status: 400, errors: 'Usuário não existe' });
            }

            res.cookie('token', tokenReturn.token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 3600000,
            });

            return res.status(200).json(tokenReturn);
        } catch (error: any) {
            console.error(error);
            if (error instanceof ErrorException) {
                return res.status(error.statusCode).json({
                    status: error.statusCode,
                    error: error.errors,
                });
            } else {
                return res.status(500).json({
                    status: 500,
                    error: 'Internal Server Error',
                });
            }
        }
    }
}

export default new AuthController();
