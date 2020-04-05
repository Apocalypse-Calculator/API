import dotenv from 'dotenv';

dotenv.config();

export default {
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME || 'test',
  jwtSecret: process.env.JWT_SECRET,
  basePath: process.env.BASE_PATH || '/.netlify/functions',
  serverAPIUrl:
    process.env.SERVER_API_URL || 'http://localhost:9000/.netlify/functions',
  facebook: {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
  },
};
