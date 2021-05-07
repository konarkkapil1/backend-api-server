import { Router, Request, Response } from 'express';
import SignupService from '../../../services/auth/Signup';
import { HttpResponse, InternalServerError } from '../../../response/Response';

export default class Signup {
    private app: Router;

    constructor(app: Router) {
        this.app = app;
    }

    public getRoute(): Router {
        //TODO: Make validations
        return this.app.post('/signup', async (req: Request, res: Response) => {

            const newUser = new SignupService(req.body);

            try{
                const user = await newUser.save();

                return new HttpResponse('user',user).send(res);
            }catch(error){
                return new InternalServerError().send(res);
            }
            
        })
    }
}