import { Express } from 'express';

export interface IApp {
    app: Express;
    server: (port: number) => void;
}
