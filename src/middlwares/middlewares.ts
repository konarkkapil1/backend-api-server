import { Application } from 'express';
import bodyparser from 'body-parser';

export default class Middlewares {
    private app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    public createMiddlewares() {
        //create more middlewares in future here
        this.app.use(bodyparser.json());
    }
}