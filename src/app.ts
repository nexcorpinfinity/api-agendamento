import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import sequelizeConnection from './config/database';

import { adminRoute } from './admin/routes/adminRoute';

import { commerceRoute } from './modules/commerces/routes/commerceRoute';
import { authRoute } from './modules/auth/routes/authRoute';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { reportsRoute } from './modules/reports/routes/reportsRoute';
import { usersRoute } from './modules/users/routes/usersRoute';

dotenv.config();

const whitelist = ['http://localhost:3000', 'http://127.0.0.1:5173', 'http://localhost:5173'];

const corsOptions: cors.CorsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin as string) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

class App {
    public app: Express;

    constructor() {
        this.connectionDatabase();
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors(corsOptions));
        this.app.use(helmet());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/api/admin', adminRoute);
        this.app.use('/api/auth', authRoute);
        this.app.use('/api/commerce', commerceRoute);
        // this.app.use('/api/reports', reportsRoute);
        this.app.use('/api/users', usersRoute);
    }

    async connectionDatabase() {
        try {
            await sequelizeConnection.authenticate();
            console.log('[server]: Connection database success');
        } catch (err) {
            console.error('[server]: Error connecting database', err);
        }
    }
}

export default new App().app;
