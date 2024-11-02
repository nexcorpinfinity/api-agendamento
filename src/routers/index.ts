import { Router } from 'express';

import { authRoute } from '../modules/auth/routes/authRoute';
import { businessRouter } from '../modules/business/routes/businessRouter';
import { proceduresRouter } from '../modules/procedures/router/ProceduresRouter';
import { segmentsRoute } from '../modules/segments/router/segmentsRouter';
import { usersRoute } from '../modules/users/routes/usersRoute';

class Routers {
    private router: Router = Router();
    private versionApiV1: string = '/api/v1';

    public constructor() {
        this.initializeRoutes(this.versionApiV1);
    }

    private initializeRoutes(versionApi: string): void {
        this.router.get(`${versionApi}/`, (req, res) => res.json('Hello World!'));
        this.router.use(`${versionApi}/auth`, authRoute);
        this.router.use(`${versionApi}/users`, usersRoute);
        this.router.use(`${versionApi}/segments`, segmentsRoute);
        this.router.use(`${versionApi}/business`, businessRouter);
        this.router.use(`${versionApi}/procedures`, proceduresRouter);
    }

    public getRouter(): Router {
        return this.router;
    }
}

export { Routers };
