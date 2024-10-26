import { Request, Response } from 'express';

export interface IUserController {
    createAdminUser(
        req: Request,
        res: Response,
    ): Promise<Response<string, Record<string, string>>>;
    createBusinessUser(
        req: Request,
        res: Response,
    ): Promise<Response<string, Record<string, string>>>;
    createClientUser(
        req: Request,
        res: Response,
    ): Promise<Response<string, Record<string, string>>>;
}
