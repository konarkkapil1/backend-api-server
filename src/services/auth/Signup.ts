import UserRepo from '../../database/repositories/User';
import User from '../../database/models/User';
import Token from '../token/TokenService';

export default class SignupService {
    private user:User;
    private newUser: object;

    constructor(user:User) {
        this.user = user;
        this.newUser = {};
    }

    public async save(): Promise<object> {

        //TODO: create a sanitisation service

        try{
            const user = await UserRepo.findByEmail(this.user.email);
            if (user) {
                throw new Error("User already exists");
            }
        }catch(error) {
            throw new Error(error);
        }

        try{
            this.user = await UserRepo.create(this.user);
            const tokenData = {
                id: this.user._id,
                name: this.user.name,
                email: this.user.email,
                profilePicUrl: this.user.profilePicUrl
            }
            const token = new Token(tokenData).encode();
            this.newUser = {
                id: this.user._id,
                name: this.user.name,
                email: this.user.email,
                profilePicUrl: this.user.profilePicUrl,
                token
            }
        }catch(error){
            throw new Error(error);
        }

        return this.newUser;
    }
}