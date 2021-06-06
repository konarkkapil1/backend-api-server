import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import JWT from '../utils/JWT';
import { token, DOMAIN } from '../config';
import { UnauthorizedError }  from '../response/Response';
import TokenService from '../services/token/TokenService';

export default class Authentication {

    public authenticate() {
        return async (req: any, res: Response, next: NextFunction) => {
            if (req.headers['access-token']) {
                const accessToken: string = req.headers['access-token'].toString();

                try{
                    const decodedAccessToken: any = await TokenService.decodeAccessToken(accessToken);
                    
                    //verifying token
                    if (this.validateToken(decodedAccessToken) != true) {
                        console.log("invalid token");
                        return new UnauthorizedError().send(res);
                    }

                    req.user = decodedAccessToken;

                    next();
                }catch(error){
                    return new UnauthorizedError().send(res);
                }
            } else {
                return new UnauthorizedError().send(res);
            }
        }
    }

    private validateToken(payload: JWT): boolean {
        if (
            payload == undefined ||
            payload.iat == undefined ||
            payload.sub == undefined ||
            payload.prm == undefined ||
            payload.iss != DOMAIN
        ) {
            return false;
        }
        return true;
    }
}