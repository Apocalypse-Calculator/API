import express, { Application, Router } from 'express';
import BodyParser from 'body-parser';
import passport from 'passport';
import AuthRoutes from '~/src/handlers/auth';
import { initAuthentication } from '~/src/services/auth';
import { getConnection } from '~/src/storage';
import config from '~/src/config';

const createApp = async (name: string): Promise<Application> => {
  const app = express();
  await getConnection();
  initAuthentication(app);

  app.use(BodyParser.json());
  app.use(BodyParser.urlencoded({ extended: true }));
  app.use(passport.initialize());

  const routerBasePath = `${config.basePath}/${name}`;

  const router = Router();
  router.use('/', AuthRoutes);
  app.use(routerBasePath, router);

  return app;
};

export default createApp;
