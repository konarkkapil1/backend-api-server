import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { nextTick } from 'node:process';
import { token } from '../config';
import { InternalServerError, UnauthorizedError }  from '../response/Response';

export default class Authentication {
    private req: Request;
    private res: Response;
    private next: NextFunction;

    constructor(req: Request, res: Response, next: NextFunction) {
        this.req = req;
        this.res = res;
        this.next = next;
        this.authenticate();
    }

    private authenticate() {
        // if(!this.req.headers['authorization']) new UnauthorizedError().send(this.res);

        // const header: string | undefined = this.req.headers['authorization'];
        // const authToken: string = header.split(' ')[1];

        // if (token != null) {
        //     try{
        //         this.req.payload = jwt.verify(authToken, token.ACCESS_TOKEN_SECRET);
        //         this.next();
        //     }catch(error){
        //         new InternalServerError().send(this.res);
        //     }
        // }
    }
}