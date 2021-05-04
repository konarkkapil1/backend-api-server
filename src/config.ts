require('dotenv').config();

//port for application
export const PORT = 3001;

export const DOMAIN = process.env.DOMAIN || 'localhost';

export const db = {
    DB_USER: process.env.DB_USER || '',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_NAME: process.env.DB_NAME || '',
    DB_CLUSTER: process.env.DB_CLUSTER || '',
}

export const token = {
    ACCESS_TOKEN_SECRET:  process.env.JWT_ACCESS_TOKEN_SECRET || '',
    REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET || '',
    ALGO: process.env.JWT_ALGO || '',
}