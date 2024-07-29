import { Request, Response } from 'express';

class RestaurantController {
    index(req: Request, res: Response) {
        res.json('Restaurant Admin');
    }
}

export default new RestaurantController();
