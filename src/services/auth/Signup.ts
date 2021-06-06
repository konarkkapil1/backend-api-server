import UserRepo from '../../database/repositories/User';
import User from '../../database/models/User';
import Token from '../token/TokenService';
import Hash from '../hash/Hash';

export default class SignupService {
    private user: User;
    private newUser: object;

    constructor(user:User) {
        this.user = user;
        this.newUser = {};
    }

    public async save(): Promise<object> {

        try{
            const user = await UserRepo.findByEmail(this.user.email);
            if (user) {
                throw new Error("User already exists");
            }
        }catch(error) {
            throw new Error(error);
        }

        try{
            const hash = new Hash(this.user.password);
            this.user.password = await hash.encrypt();
        }catch(error) {
            throw new Error(error)
        }

        try{
            this.user = await UserRepo.create(this.user);
            const tokenData = {
                id: this.user._id,
                name: this.user.name,
                email: this.user.email,
                profilePicUrl: this.user.profilePicUrl
            }
            const token = Token.encode(tokenData);
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