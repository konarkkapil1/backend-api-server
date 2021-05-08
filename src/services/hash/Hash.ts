import bcrypt from 'bcryptjs';

export default class Hash {
    private password: String;

    constructor(password: String) {
        this.password = password;
    }

    public async encrypt(): Promise<String> {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = bcrypt.hashSync(this.password.toString(), salt);
        
        return hashedPassword;
    }

    public async compare(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compareSync(password, hashedPassword);
    }
}