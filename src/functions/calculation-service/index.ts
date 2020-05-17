import express, { Application, Router } from 'express';
import BodyParser from 'body-parser';
import CalculationRoutes from '~/src/handlers/calculations';
import { getConnection } from '~/src/storage';
import config from '~/src/config';

const createApp = async (name: string): Promise<Application> => {
  const app = express();
  await getConnection();

  app.use(BodyParser.json());
  app.use(BodyParser.urlencoded({ extended: true }));

  const routerBasePath = `${config.basePath}/${name}`;
  const router = Router();
  router.use('/', CalculationRoutes);
  app.use(routerBasePath, router);

  return app;
};

export default createApp;
