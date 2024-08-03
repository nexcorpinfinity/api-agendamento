/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import UserService from '../services/UserService';
import { IUser } from '../model/interfaces/IUser';
import { ErrorException } from '../../../utils/ErrorException';

type BodyReceived = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
};
class UserController {
    async createUserNormal(req: Request, res: Response) {
        const { first_name, last_name, email, password }: BodyReceived = req.body;

        const obj: IUser = { first_name, last_name, email, password };

        try {
            const user = await new UserService().createUserNormal(obj);
            // controler > service > repository < entidade
            res.status(201).json({
                status: 201,
                response: user,
            });
        } catch (error: any) {
            console.error(error);
            if (error instanceof ErrorException) {
                res.status(error.statusCode).json({
                    status: error.statusCode,
                    error: error.errors,
                });
            } else {
                res.status(500).json({
                    status: 500,
                    error: 'Internal Server Error',
                });
            }
        }
    }

    async createUserAdmin(req: Request, res: Response) {
        const { first_name, last_name, email, password }: BodyReceived = req.body;

        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({ status: 400, error: 'Todos os campos são obrigatórios' });
        }

        const obj: IUser = { first_name, last_name, email, password };

        try {
            const user = await new UserService().createUserAdminGlobal(obj);

            res.status(201).json({
                status: 201,
                response: user,
            });
        } catch (error: any) {
            console.error(error);
            if (error instanceof ErrorException) {
                res.status(error.statusCode).json({
                    status: error.statusCode,
                    error: error.errors,
                });
            } else {
                res.status(500).json({
                    status: 500,
                    error: 'Internal Server Error',
                });
            }
        }
    }
}

export default new UserController();
