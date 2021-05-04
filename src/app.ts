import { Application } from 'express';
import { Database } from './database/index';

export default class App {
    private app: Application;
    private readonly port: number;

    constructor(app: Application, port: number) {
        this.app = app;
        this.port = port;
        
        //create a db instance and connect
        new Database();
    }

    public run() {
        this.app.listen(this.port, () => {
            console.log(`app running on PORT: ${this.port}`);
        })
    }
    
}