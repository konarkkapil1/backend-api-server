import Token from '../token/TokenService';
import bcrypt from 'bcryptjs';
import UserRepo from '../../database/repositories/User';

export default class LoginService {
    private email: string;
    private password: string;

    INVALID_CREDENTIALS_ERROR = "Invalid Credentials";

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    public async login(): Promise<object> {

        try{
            const user = await UserRepo.findByEmail(this.email);
            
            if (user == undefined) {
                throw new Error(this.INVALID_CREDENTIALS_ERROR);
            }

            if (await bcrypt.compare(this.password, user.password.toString()) == false) {
                throw new Error(this.INVALID_CREDENTIALS_ERROR);
            }

            const tokenData = {
                id: user._id,
                name: user.name,
                email: user.email,
                profilePicUrl: user.profilePicUrl,
            }
            const token = new Token(tokenData).encode();
            
            return {
                id: user._id,
                name: user.name,
                email: user.email,
                profilePicUrl: user.profilePicUrl,
                token
            };
                
            
        }catch(error) {
            throw new Error(this.INVALID_CREDENTIALS_ERROR);
        }
    }
}