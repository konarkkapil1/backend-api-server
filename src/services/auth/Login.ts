import bcrypt from 'bcryptjs';
import UserRepo from '../../database/repositories/User';
import TokenService from '../token/TokenService';
import SessionService from '../session/SessionService';

export default class LoginService {
    private email: string;
    private password: string;

    INVALID_CREDENTIALS_ERROR = "Invalid Credentials";

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    public async login(): Promise<object | Error> {
        var user = null;

        try{
            user = await UserRepo.findByEmail(this.email);
            
            if (user == undefined) {
                throw new Error(this.INVALID_CREDENTIALS_ERROR);
            }

            if (await bcrypt.compare(this.password, user.password.toString()) == false) {
                throw new Error(this.INVALID_CREDENTIALS_ERROR);
            }
    
        }catch(error) {
            throw new Error(this.INVALID_CREDENTIALS_ERROR);
        }
        
        var token: any = null;
        try {
            token = TokenService.encode({id: user.id});
        }catch(error){
            throw new Error(error);
        }
        
        try{
            const sessionService = new SessionService({
                uid: user.id,
                refreshToken: token.refreshTokenId
            });
            sessionService.save();
        }catch(error){  
            throw new Error(error);
        }

        return {
            id: user._id,
            name: user.name,
            email: user.email,
            profilePicUrl: user.profilePicUrl,
            token: {
                accessToken: token.accessToken,
                refreshToken: token.refreshToken
            }
        };
    }

}