import jwt from 'jsonwebtoken';
import { token, DOMAIN } from '../../config';
import { v4 as uuid } from 'uuid';

export default class Token {
    private payload: any;
    private accessTokenOptions: object;
    private refreshTokenOptions: object;
    private iat: number;
    private accessTokenSecret: string;
    private refreshTokenSecret: string;

    //TODO: import algo from a common store
    constructor(payload: any) {
        this.payload = payload;
        this.iat = Date.now();
        this.accessTokenSecret = token.ACCESS_TOKEN_SECRET;
        this.refreshTokenSecret = token.REFRESH_TOKEN_SECRET;
        this.accessTokenOptions = {
            expiresIn: '1w',
            issuer: DOMAIN,
        }
        this.refreshTokenOptions = {
            expiresIn: '1y',
            issuer: DOMAIN,
        }
    }

    public encode(): object | Error {
        try{
            const accessToken = jwt.sign({iat: this.iat, data: this.payload, sub: this.payload.id, prm: uuid()} , this.accessTokenSecret, this.accessTokenOptions);
            const refreshToken = jwt.sign({iat: this.iat, data: {}, sub: this.payload.id, prm: uuid()}, this.refreshTokenSecret, this.refreshTokenOptions)

            return {accessToken, refreshToken};
        }catch(error){
            throw new Error(error.message);
        }
    }

}