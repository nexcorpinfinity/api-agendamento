import { Request, Response, NextFunction } from 'express';
import { decodeToken } from '../utils/DecodeToken';

export const authenticateToken = (requiredPermissions: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        const authcookies = req.headers.cookie;

        const cookies = authcookies?.split('=')[1];

        // console.log('vindo do cookie', cookies);
        // console.log('vindo do token', token);

        // if (!token) {
        //     return res.status(401).json({ message: 'Usuario não autenticado' });
        // }

        function verificarSeVeioBearerOuPeloCookie(bearer: string | undefined, cookie: string | undefined) {
            if (bearer && !cookie) {
                bearer.split('Bearer ')[1];
                return bearer;
            } else if (cookie && !bearer) {
                cookie.split('=')[1];
                return cookie;
            }
        }

        const tokenFinal = verificarSeVeioBearerOuPeloCookie(token, cookies);

        if (tokenFinal === undefined) return res.status(401).json({ message: 'Usuario não autenticado' });

        console.log('token final', tokenFinal);

        try {
            const decoded = decodeToken(tokenFinal);

            if (decoded === null) return res.status(403).json({ message: 'Forbidden or Token Invalid' });

            const hasPermission = requiredPermissions.some((permission) => decoded.permission.includes(permission));

            if (hasPermission) {
                next();
            } else {
                return res.status(403).json({ message: 'Acesso negado' });
            }
        } catch (error) {
            return res.status(403).json({ message: 'Forbidden' });
        }
    };
};
