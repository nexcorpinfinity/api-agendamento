/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { ResponseHandler } from '../config/ResponseHTTP/ResponseHTTP';

export default (req: Request, res: Response, next: NextFunction): Response | void => {
    const authorization: string | undefined = req.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return ResponseHandler.error(res, 401, 'Usuário não autenticado.');
    }

    if (authorization && authorization.startsWith('Bearer ')) {
        const token = authorization.split(' ')[1];

        try {
            const data: string | JwtPayload = jwt.verify(
                token,
                process.env.TOKEN_SECRET as string,
                {
                    algorithms: ['HS256'],
                },
            );

            const { id, permission } = data as JwtPayload;

            res.locals.user = { id, permission };

            res.setHeader('Cache-Control', 'no-store');
            res.setHeader('Pragma', 'no-cache');

            return next();
        } catch (error: any) {
            return ResponseHandler.error(res, 401, error);
        }
    }
};
