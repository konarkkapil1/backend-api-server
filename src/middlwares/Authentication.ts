import { NextFunction, Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { token } from '../config';
import { InternalServerError, UnauthorizedError }  from '../response/Response';

export default class Authentication {
    private app: Router;

    constructor(app: Router) {
        this.app = app;
    }

    public authenticate() {
        return async (req: any, res: Response, next: NextFunction) => {
            if (req.headers['access-token']) {
                const accessToken: string = req.headers['access-token'].toString();
                try{
                    const decodedAccessToken: any = await jwt.verify(accessToken, token.ACCESS_TOKEN_SECRET);
                    if (decodedAccessToken.exp < Date.now()) {
                        return new UnauthorizedError().send(res);
                    }
                    req.user = decodedAccessToken;

                    next();
                }catch(error){
                    return new InternalServerError().send(res);
                }
            } else {
                return new UnauthorizedError().send(res);
            }
        }
    }
}