import { Router } from 'express';
import Signup from './auth/signup';
import Authentication from '../../middlwares/Authentication';
import { NotFound } from '../../response/Response';

export default class Routes {
    private app: Router;
    
    constructor() {
        this.app = Router();
    }

    public initialiseRoutes():Router {
        
        //-------AUTH ROUTES--------
        //TODO: put signup and login routes in a single file
        /*
            @@PATH = /auth/signup
        */
        this.app.use('/auth', new Signup(this.app).getRoute());

        //Authentication middleware
        this.app.use(new Authentication(this.app).authenticate());

        this.app.get('/index', (req,res) => {
            res.json({message: "success", user: (<any>req).user});
        })
        
        //handles 404 routes
        this.app.use((req,res,next) => {
            next(new NotFound().send(res));
        })

        return this.app;
    }
}