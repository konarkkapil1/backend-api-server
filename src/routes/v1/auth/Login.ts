import { Request, Response, Router } from 'express';
import LoginService from '../../../services/auth/Login';
import Token from '../../../services/token/TokenService';
import SessionService from '../../../services/session/SessionService';
import { BadRequest, HttpResponse, InternalServerError, UnauthorizedError } from '../../../response/Response';
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
                const user: User = await loginService.login();

                if (!user) {
                    return new BadRequest("Invalid Credentials").send(res);
                }

                const tokenData = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    profilePicUrl: user.profilePicUrl,
                }
                const token: any = new Token(tokenData).encode();
                
                if (!token) {
                    return new InternalServerError().send(res);
                }

                const response = {
                    token: {
                        accessToken: token.accessToken,
                        refreshToken: token.refreshToken
                    },
                    ...user
                }

                const sessionData = {
                    uid: user.id,
                    refreshToken: token.refreshTokenId,
                }
                const sessionService = new SessionService(sessionData);
                const isSessionSaved = await sessionService.save();

                if (!isSessionSaved) {
                    return new InternalServerError().send(res);
                }

                return new HttpResponse('user', response).send(res);

            }catch(error) {
                console.log(error.message);
                return new UnauthorizedError().send(res);
            }

        })
    }
    
}