import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import sequelizeConnection from './config/database';

import { adminRoute } from './admin/routes/adminRoute';
import { restaurantRoute } from './modules/admin-restaurant/routes/restaurantRoute';

dotenv.config();

const whitelist = ['http://localhost:3000'];

const corsOptions: cors.CorsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin as string) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
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
        this.app.use('/api/restaurant', restaurantRoute);
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
