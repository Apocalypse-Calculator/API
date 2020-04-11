import mongoose from 'mongoose';
import config from '~/src/config';

export const getConnection = async () => {
  const { user, password, host, name } = config.database;
  const encodedUser = encodeURI(user);
  const encodedPassword = encodeURI(password);
  const url = `mongodb+srv://${encodedUser}:${encodedPassword}@${host}/${name}?retryWrites=true&w=majority`;
  return await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
