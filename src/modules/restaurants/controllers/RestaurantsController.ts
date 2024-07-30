import { Request, Response } from 'express';

class RestaurantsController {
    index(req: Request, res: Response) {
        res.json('RestaurantsController');
    }
}

export default new RestaurantsController();
