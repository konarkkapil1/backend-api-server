import User, { UserModel } from '../models/User';
import { Types } from 'mongoose';

export default class UserRepo {

    public static async findByEmail(email:String): Promise<User | null>{
        
        return await UserModel.findOne({email: email}).lean<User>().exec();
        
    }

    public static async create(user: User): Promise<User> {
        
        try{
            user.createdAt = user.updatedAt = new Date();
            const createdUser = await UserModel.create(user);
            return createdUser;
        }catch(error){
            throw new Error(error)
        }

    }
}