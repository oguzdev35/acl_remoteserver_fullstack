import { config } from 'dotenv';

// load variables at .env file to process.env
config();

// Server infrastructure related global variables
const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV || 'development';
const jwtSecret = process.env.JWT_SECRET || 'Your Jwt Secret';
const mongodbRootUri = process.env.DATABASE_ROOT_URI || 'mongodb://localhost:27017';
const dbUri = `${mongodbRootUri}/maksisoft`;

export default {
  port, env, jwtSecret,mongodbRootUri, dbUri
};