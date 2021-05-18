import SessionRepo from '../../database/repositories/Session';

export default class SessionService {
    private data: any;

    constructor(data: any) {
        this.data = data;
    }

    public async save(): Promise<boolean> {
        try{
            const result = await SessionRepo.create(this.data);

            if (result != undefined) {
                return true;
            }

            return false;
        }catch(error){
            throw new Error(error);
        }
    }

    public async delete(): Promise<boolean> {
        try{
            const result = await SessionRepo.delete(this.data.id);

            if (!result) {
                return false;
            }
            
            return true;
        }catch(error){
            throw new Error(error);
        }
    }
}