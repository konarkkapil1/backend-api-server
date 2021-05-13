import App from './app';
import express, { Application } from 'express';
import { PORT } from './config';
import Loaders from './loaders/loaders';

class Server {
    private app: Application = express();
    
    constructor() {
        new Loaders(this.app).createLoaders();
        new App(this.app, PORT).run();
    }
}

new Server();