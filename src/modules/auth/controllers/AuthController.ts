import { Request, Response } from 'express';

class AuthController {
    index(req: Request, res: Response) {
        res.json('AuthController');
    }
}

export default new AuthController();
