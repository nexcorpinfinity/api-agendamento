import { Request, Response, NextFunction } from 'express';

import { decodeToken } from '../utils/DecodeToken';

export const authenticateToken = (requiredPermissions: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (token === undefined) {
            return res.status(401).json({ message: 'Usuario não autenticado' });
        }

        console.log('token final', token);

        try {
            const decoded = decodeToken(token);
            console.log(decoded);

            if (decoded === null) {
                return res.status(403).json({ message: 'Forbidden or Token Invalid' });
            }

            const hasPermission = requiredPermissions.some((permission) => decoded.permission.includes(permission));

            if (hasPermission) {
                return next();
            } else {
                return res.status(403).json({ message: 'Acesso negado' });
            }
        } catch (error) {
            return res.status(403).json({ message: 'Forbidden' });
        }
    };
};
