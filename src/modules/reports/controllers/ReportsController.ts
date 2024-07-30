import { Request, Response } from 'express';

class ReportsController {
    index(req: Request, res: Response) {
        res.json('ReportsController');
    }
}

export default new ReportsController();
