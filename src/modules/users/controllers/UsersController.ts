import { Request, Response } from 'express';

class UsersController {
    index(req: Request, res: Response) {
        res.json('UsersController');
    }
}

export default new UsersController();
