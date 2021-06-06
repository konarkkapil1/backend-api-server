import { Request, Response, Router } from 'express';
import TokenService from '../../../services/token/TokenService';
import { UnauthorizedError, InternalServerError, HttpResponse } from '../../../response/Response';

export default class Refresh {
    private app: Router;

    constructor(app: Router) {
        this.app = app;
    }

    public getRoute(): Router {
        return this.app.post('/refresh', async (req: Request, res: Response) => {
            const token = req.headers['refresh-token']?.toString();

            if (!token) {
                return new UnauthorizedError().send(res);
            }

            try{
                const payload: any = TokenService.decodeRefreshToken(token);
                TokenService.removeToken(payload.prm);

                const newTokens: any = TokenService.encode(payload);

                const result = {
                    accessToken: newTokens.accessToken,
                    refreshToken: newTokens.refreshToken
                };

                return new HttpResponse('success',{token: result}).send(res);
            }catch(error) {
                console.log(error);
                return new InternalServerError().send(res);
            }
        });
    }
}