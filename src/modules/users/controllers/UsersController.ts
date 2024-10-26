/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import { IUserController } from '../interfaces/IUserController';
import { IUserService } from '../interfaces/IUserService';

export class UserController implements IUserController {
    public constructor(private readonly userService: IUserService) {}

    public createAdminUser(req: Request, res: Response): void {
        const a = req.body;
        this.userService;
        console.log(a);
        res.json('ok');
    }
    public createBusinessUser(req: Request, res: Response): void {
        const a = req.body;
        console.log(a);
        res.json('ok');
    }
    public createClientUser(req: Request, res: Response): void {
        const a = req.body;
        console.log(a);
        res.json('ok');
    }
}
