import jwt from 'jsonwebtoken';
import { token, DOMAIN } from '../../config';
import { v4 as uuid } from 'uuid';
import SessionRepo from '../../database/repositories/Session';
import SessionService from '../session/SessionService';

export default class TokenService {
    static ACCESS_TOKEN_SECRET = token.ACCESS_TOKEN_SECRET;
    static REFRESH_TOKEN_SECRET = token.REFRESH_TOKEN_SECRET;

    public static encode(payload: any): object {
        try{
            const accessTokenId = uuid();
            const refreshTokenId = uuid();

            const sub = payload.id ?? payload.sub;

            const accessToken = jwt.sign({iat: Math.floor(Date.now() / 1000), sub: sub, prm: accessTokenId, alg: 'RS256', exp: Math.floor(Date.now()/1000) + (60*5), iss: DOMAIN} , this.ACCESS_TOKEN_SECRET);
            const refreshToken = jwt.sign({iat: Math.floor(Date.now() / 1000), data: {}, sub: sub, prm: refreshTokenId, alg: 'RS256', exp: Math.floor(Date.now()/1000) + (365*24*60*60), iss: DOMAIN}, this.REFRESH_TOKEN_SECRET);
            
            try{
                const sessionService = new SessionService({
                    uid: payload.sub,
                    refreshToken: refreshTokenId
                });
                sessionService.save();
            }catch(error){
                throw new Error(error);
            }

            return { accessToken, refreshToken, accessTokenId: accessTokenId, refreshTokenId: refreshTokenId };
        }catch(error){
            throw new Error(error);
        }
    }

    public static decodeRefreshToken(refreshToken: string): object{
        try{
            const decodedToken: any = jwt.verify(refreshToken, this.REFRESH_TOKEN_SECRET);

            return decodedToken;
        }catch(error) {
            throw new Error(error);
        }
    }

    public static decodeAccessToken(accessToken: string): object {
        try {
            const decodedToken: any = jwt.verify(accessToken, this.ACCESS_TOKEN_SECRET);

            return decodedToken;
        }catch(error){
            throw new Error(error);
        }

    }

    public static async removeToken(prm: string): Promise<boolean | Error> {
        try{
            return await SessionRepo.delete(prm);
        }catch(error){
            console.log(error);
            throw new Error(error);
        }
    }

}