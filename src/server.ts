import { App } from './app';

const port = Number(process.env.PORT);

new App().server(port);
