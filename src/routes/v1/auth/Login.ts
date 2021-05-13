import { Request, Response, NextFunction, Router } from 'express';
import LoginService from '../../../services/auth/Login';
import { BadRequest, HttpResponse, UnauthorizedError } from '../../../response/Response';

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
                const user = await loginService.login();

                if (!user) {
                    return new UnauthorizedError().send(res);
                }

                return new HttpResponse('user', user).send(res);

            }catch(error) {
                return new UnauthorizedError().send(res);
            }

        })
    }
    
}