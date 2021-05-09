import { Router } from 'express';
import Signup from './auth/signup';
import Login from './auth/Login';
import Authentication from '../../middlwares/Authentication';
import { NotFound } from '../../response/Response';

export default class Routes {
    private app: Router;
    
    AUTH_ROUTES_PATH = '/auth';

    constructor() {
        this.app = Router();
    }

    public initialiseRoutes():Router {
        
        //-------AUTH ROUTES--------
        //TODO: put signup and login routes in a single file
        /*
            @@PATH = /auth/signup
        */
        this.app.use(this.AUTH_ROUTES_PATH, new Signup(this.app).getRoute());
        this.app.use(this.AUTH_ROUTES_PATH, new Login(this.app).getRoute())

        //Authentication middleware
        this.app.use(new Authentication().authenticate());

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