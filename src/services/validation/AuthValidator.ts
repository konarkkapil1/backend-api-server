import validator from 'validator';

export default class AuthValidatorService {

    public validateLogin(email: string, password: string): boolean {
        const result = validator.isEmpty(email) || validator.isEmpty(password) || validator.isEmail(email);
        
        return result;
    }
    
}