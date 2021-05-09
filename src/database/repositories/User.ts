import User, { UserModel } from '../models/User';
import { Types } from 'mongoose';

export default class UserRepo {

    public static async findByEmail(email:String): Promise<User | null>{
        
        try{
            const user =  await UserModel.findOne({email}).select('+password').exec();
            
            return user;
        }catch(error){
            throw new Error(error);
        }
        
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