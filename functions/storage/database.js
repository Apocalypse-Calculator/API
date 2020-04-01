import mongoose from 'mongoose';
import config from '../config';

const { dbUser, dbPassword, dbHost, dbName } = config;
export const getConnection = async () => {
  const encodedUser = encodeURI(dbUser);
  const encodedPassword = encodeURI(dbPassword);
  const url = `mongodb+srv://${encodedUser}:${encodedPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`;
  return await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
