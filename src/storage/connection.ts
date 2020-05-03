import mongoose from 'mongoose';
import config from '~/src/config';

const makeURLString = () => {
  if (config.environment === 'docker') {
    return 'mongodb://mongodb/test';
  }
  const { user, password, host, name } = config.database;
  const encodedUser = encodeURI(user);
  const encodedPassword = encodeURI(password);
  return `mongodb+srv://${encodedUser}:${encodedPassword}@${host}/${name}?retryWrites=true&w=majority`;
};

export const getConnection = async () => {
  const url = makeURLString();
  return await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

const DBStatus = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
};

export const dbConnectionStatus = () => {
  return DBStatus[mongoose.connection.readyState];
};
