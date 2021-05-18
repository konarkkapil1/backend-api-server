import { Document, Schema, model } from 'mongoose';

export default interface Session extends Document {
    uid: string,
    refreshToken: string
    createdAt?: Date,
    isBlacklisted?: boolean,
}

const DOCUMENT_NAME = 'Sessions';
const COLLECTION_NAME = 'sessions';

const schema = new Schema({
    uid: {
        type: Schema.Types.String,
        required: true,
        trim: true
    },
    refreshToken: {
        type: Schema.Types.String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Schema.Types.Date,
        default: Date.now(),
        required: true,
        select: false,
    },
    isBlackListed: {
        type: Schema.Types.Boolean,
        default: false
    }
});

export const SessionModel = model<Session>(DOCUMENT_NAME, schema, COLLECTION_NAME);