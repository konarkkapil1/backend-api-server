import { Application } from 'express';
import Middlewares from '../middlwares/middlewares';
import Routes from '../routes/v1/index';

export default class Loaders {
    private app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    public createLoaders() {
        //initialise middlewares
        new Middlewares(this.app).createMiddlewares();
        //initialise routes
        this.app.use('/api', new Routes().initialiseRoutes());
    }
}