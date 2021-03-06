import dotenv from 'dotenv';
import { DBConnection } from '../types';

dotenv.config();

const dbConnection: DBConnection = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  name: process.env.DB_NAME || 'test',
};

export default {
  environment: process.env.NODE_ENV || 'development',
  database: dbConnection,
  jwtSecret: process.env.JWT_SECRET,
  basePath: process.env.BASE_PATH || '/.netlify/functions',
  serverAPIUrl:
    process.env.SERVER_API_URL || 'http://localhost:9000/.netlify/functions',
  facebook: {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  twitter: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  },
};
