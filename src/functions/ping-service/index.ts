import express, { Application } from 'express';
import config from '~/src/config';
import { getConnection } from '~/src/storage';
import ping from '~/src/handlers/ping';

export const createApp = async (name: string): Promise<Application> => {
  const app = express();
  await getConnection();

  const routerBasePath = `${config.basePath}/${name}`;

  app.use(routerBasePath, ping);
  return app;
};
