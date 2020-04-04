import express from 'express';
import bodyParser from 'body-parser';
import config from '../core/config';
import { getConnection } from '../core/storage';
import mongoose from 'mongoose';

const DBStatus = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
};

const ping = async (req, res) => {
  await getConnection();
  const databaseStatus = mongoose.connection.readyState;
  res.json({ databaseStatus: DBStatus[databaseStatus] });
};

const createApp = (functionName) => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const routerBasePath = `${config.basePath}/${functionName}`;

  app.get(routerBasePath, ping);
  return app;
};

export default createApp;
