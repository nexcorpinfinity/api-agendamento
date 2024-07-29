import App from './app';

const port = process.env.PORT;

App.listen(port, () => {
    console.log(`[server]: Server is running in http://localhost:${port}`);
});
