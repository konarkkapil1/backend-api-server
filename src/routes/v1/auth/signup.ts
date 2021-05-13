import { Router, Request, Response } from 'express';
import SignupService from '../../../services/auth/Signup';
import { BadRequest, HttpResponse, InternalServerError } from '../../../response/Response';

export default class Signup {
    private app: Router;
    PASSWORD_MIN_LENGTH = 4;
    NAME_MIN_LENGTH = 3;
    EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    constructor(app: Router) {
        this.app = app;
    }

    public getRoute(): Router {
        //TODO: Make validations
        return this.app.post('/signup', async (req: Request, res: Response) => {

            const { email, password, name } = req.body;

            if (email == undefined || password == undefined || name == undefined) {
                return new BadRequest('Fields cannot be left blank').send(res);
            }

            if (!email.matches(this.EMAIL_REGEX)) {
                return new BadRequest("Invalid Email").send(res);
            }

            if (password.length < this.PASSWORD_MIN_LENGTH) {
                return new BadRequest(`Password should be atleast ${this.PASSWORD_MIN_LENGTH} characters long`).send(res);
            }

            if (name.length < this.NAME_MIN_LENGTH) {
                return new BadRequest(`Name should be atleast ${this.NAME_MIN_LENGTH} characters long`).send(res);
            }
            
            const newUser = new SignupService(req.body);

            try{
                const user = await newUser.save();

                return new HttpResponse('user',user).send(res);
            }catch(error){
                console.log(error);
                return new InternalServerError().send(res);
            }
            
        })
    }
}