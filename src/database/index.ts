import mongoose from 'mongoose'
import { db } from '../config';

export class Database {

    constructor() {
        this.connect();
    }
    
    //database connection options
    private options = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        autoIndex: true,
        poolSize: 10, // Maintain up to 10 socket connections
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0,
        connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    };

    private connectionString = `mongodb+srv://${db.DB_USER}:${db.DB_PASSWORD}@${db.DB_CLUSTER}/${db.DB_NAME}?retryWrites=true&w=majority`

    public connect() {
        mongoose.connect(this.connectionString, this.options)
        .then(() => {
            console.log(`database connected`);
        })
        .catch(error => console.log(error))
    }
    
}