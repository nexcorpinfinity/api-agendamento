import { Request, Response } from 'express';

class AdminController {
    index(req: Request, res: Response) {
        res.json('hello Admin');
    }

    // dashBoard(req: Request, res: Response) {}
}

export default new AdminController();
