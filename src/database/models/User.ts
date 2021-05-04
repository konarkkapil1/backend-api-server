import mongoose, { Document, Schema, model } from 'mongoose';

export default interface User extends Document {
    name: String,
    email: String,
    password: String,
    profilePicUrl?: String,
    isVerified?: boolean,
    isActive?: boolean,
    createdAt?: Date,
    updatedAt?: Date
}

const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'users';

const schema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    email: {
        type: Schema.Types.String,
        required: true,
        trim: true,
        maxlength: 256,
        unique: true
    },
    password: {
        type: Schema.Types.String,
        required: true,
        select: false
    },
    profilePicUrl: {
        type: Schema.Types.String,
        trim: true
    },
    isVerified: {
        type: Schema.Types.Boolean,
        default: false,
    },
    isActive: {
        type: Schema.Types.Boolean,
        default: true
    },
    createdAt: {
        type: Schema.Types.Date,
        required: true,
        default: Date.now(),
        select: false
    },
    updatedAt: {
        type: Schema.Types.Date,
        required: true,
        default: Date.now(),
        select: false
    }
});

export const UserModel = model<User>(DOCUMENT_NAME, schema, COLLECTION_NAME);