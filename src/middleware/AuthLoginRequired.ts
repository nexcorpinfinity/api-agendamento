import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default (req: Request, res: Response, next: NextFunction): Response | void => {
    const { authorization } = req.headers;
    console.log(req.headers);
    if (!authorization) return res.status(401).json({ error: 'Login required' });

    const [token] = authorization.split(' ');

    try {
        jwt.verify(token, process.env.TOKEN_SECRET as string);

        return next();
    } catch (e) {
        return res.status(401).json({ error: 'Token Invalido' });
    }
};
