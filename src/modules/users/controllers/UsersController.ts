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

        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({ status: 400, error: 'Todos os campos são obrigatórios' });
        }

        const obj: IUser = { first_name, last_name, email, password };

        try {
            const user = await new UserService().createUserNormal(obj);

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

    // async createUserRestaurante(req: Request, res: Response) {
    //     const { name, email, password, cpfCnpj } = req.body;

    //     console.log('vindo da controller: ', req.body);

    //     if (!name || !email || !password || !cpfCnpj) {
    //         return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    //     }

    //     try {
    //         const user = await UserService.createUserEmpresarial(req.body);
    //         res.status(201).json(user);
    //     } catch (error) {
    //         console.log(error);
    //         res.status(400).json({ error: error });
    //     }
    // }

    // async createUserComercio(req: Request, res: Response) {
    //     const { name, email, password } = req.body;

    //     console.log('vindo da controller: ', req.body);

    //     if (!name || !email || !password) {
    //         return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    //     }

    //     try {
    //         const user = await UserService.createUserAdmin(req.body);
    //         res.status(201).json(user);
    //     } catch (error) {
    //         console.log(error);
    //         res.status(400).json({ error: error });
    //     }
    // }

    // async findById(req: Request, res: Response) {
    //     try {
    //         const user = await UserService.findById(Number(req.params.id));
    //         res.status(200).json(user);
    //     } catch (error) {
    //         res.status(404).json({ message: error });
    //     }
    // }

    // async update(req: Request, res: Response) {
    //     try {
    //         const user = await UserService.update(Number(req.params.id), req.body);
    //         res.status(200).json(user);
    //     } catch (error) {
    //         res.status(400).json({ message: error });
    //     }
    // }

    // async delete(req: Request, res: Response) {
    //     try {
    //         const result = await UserService.delete(Number(req.params.id));
    //         res.status(200).json({ message: 'User deleted successfully', result });
    //     } catch (error) {
    //         res.status(400).json({ message: error });
    //     }
    // }
}

export default new UserController();
