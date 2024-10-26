import { Router } from 'express';

import { usersRoute } from '../modules/users/routes/usersRoute';
// import { authRoute } from '../modules/auth/routes/authRoute';

class Routers {
    private router: Router = Router();
    private versionApiV1: string = '/api/v1';

    public constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        // this.router.use(`${this.versionApiV1}/auth`, authRoute);
        this.router.use(`${this.versionApiV1}/users`, usersRoute);
    }

    public getRouter(): Router {
        return this.router;
    }
}

export { Routers };
