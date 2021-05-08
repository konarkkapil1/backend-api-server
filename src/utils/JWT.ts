export default interface JWT {
    iat: string;
    iss: string;
    sub: string;
    prm: string;
    alg: string;
    exp: Date;
}