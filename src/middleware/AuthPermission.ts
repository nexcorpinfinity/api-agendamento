import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface DecodedToken {
    nomeDoUsuario: string;
    emailDoUsuario: string;
    permission: string[];
    iat: number;
    exp: number;
}

export const authenticateToken = (requiredPermission: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[0];

        if (!token) {
            return res.status(401).json({ message: 'Usuario não autenticado' });
        }

        try {
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string) as DecodedToken;

            if (decoded.permission.includes(requiredPermission)) {
                next();
            } else {
                return res.status(403).json({ message: 'Acesso negado' });
            }
        } catch (error) {
            return res.status(403).json({ message: 'Forbidden' });
        }
    };
};
