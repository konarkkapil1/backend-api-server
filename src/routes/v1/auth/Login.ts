import { Request, Response, Router } from 'express';
import LoginService from '../../../services/auth/Login';
import TokenService from '../../../services/token/TokenService';
import SessionService from '../../../services/session/SessionService';
import { BadRequest, HttpResponse, UnauthorizedError } from '../../../response/Response';
import User from '../../../database/models/User';

export default class Login {
    private app: Router;

    PASSWORD_MIN_LENGTH = 4;
    EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    constructor(app: Router) {
        this.app = app;
    }

    public getRoute(): Router {
        return this.app.post('/login', async (req: Request, res: Response) => {
            
            const { email, password } = req.body;

            if (email == undefined || password == undefined) {
                return new BadRequest("Invalid Credentials").send(res);
            }

            if (!email.match(this.EMAIL_REGEX)) {
                return new BadRequest("Invalid Credentials").send(res);
            }

            if (password.length < this.PASSWORD_MIN_LENGTH) {
                return new BadRequest("Invalid Credentials").send(res);
            }

            try{
                const loginService = new LoginService(email, password);
                const user: any = await loginService.login();

                return new HttpResponse('user', user).send(res);

            }catch(error) {
                console.log(error);
                return new UnauthorizedError().send(res);
            }

        })
    }
    
}