import Session, { SessionModel } from '../models/Session';

export default class SessionRepo {
    
    public static async findById(id: string): Promise<Session | null> {
        try{
            const session = await SessionModel.findOne({id}).exec();

            return session;
        }catch(error){
            throw new Error(error);
        }
    }

    public static async create(data: Session): Promise<Session> {
        try{
            const session = await SessionModel.create(data);

            return session;
        }catch(error){
            throw new Error(error);
        }
    }

    public static async delete(id: string): Promise<boolean> {
        try{
            const response = await SessionModel.findOneAndRemove({id});

            if (response != undefined) {
                return true;
            }
            
            return false;
        }catch(error){
            throw new Error(error);
        }
    }

}