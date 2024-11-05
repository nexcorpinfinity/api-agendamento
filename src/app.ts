import dotenv from 'dotenv';
import express, { Express } from 'express';
// import helmet from 'helmet';
import morgan from 'morgan';
import passport from 'passport';

import { CorsConfig } from './config/cors/CorsConfig';
import { sequelizeConnection } from './config/db/database';
import { Logger } from './config/logger/Logger';
import { Routers } from './routers';
import { IApp } from './types/IApp';
import { LogLevel } from './types/LogLevel';

dotenv.config();

const whitelistUrlPermitted: string[] = [
    process.env.WHITELIST1 as string,
    process.env.WHITELIST2 as string,
    process.env.WHITELIST3 as string,
];

export class App extends Logger implements IApp {
    public app: Express;
    private corsConfig: CorsConfig;

    public constructor(private readonly router = new Routers()) {
        super();
        this.corsConfig = new CorsConfig(whitelistUrlPermitted);
        this.connectionDatabase();
        this.app = express();
        this.middlewares();
    }

    private middlewares(): void {
        this.app.use(this.corsConfig.getCorsMiddleware());
        this.app.use(morgan('dev'));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(passport.initialize());
        this.app.use(this.router.getRouter());
    }

    private async connectionDatabase(): Promise<void> {
        try {
            await sequelizeConnection.authenticate();
            console.log('\x1b[42m\x1b[30m%s\x1b[0m', '[server]: Connection database success.');
            this.log('[server]: Connection database success.', LogLevel.INFO);
        } catch (err) {
            console.error(
                '\x1b[41m\x1b[30m\x1b[1m%s\x1b[0m',
                '[server]: Error connecting database.',
                err,
            );
            this.log('[server]: Error connecting database.', LogLevel.ERROR);
        }
    }

    public server(port: number): void {
        this.app.listen(port, () => {
            console.log(
                '\x1b[42m\x1b[30m%s\x1b[0m',
                `[server]: Server is running in http://localhost:${port}/api/v1`,
            );
        });

        this.log('[server]: Servidor Iniciado.', LogLevel.INFO);
    }
}
