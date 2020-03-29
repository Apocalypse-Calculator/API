import express from 'express';
import bodyParser from 'body-parser';
import * as routes from "./controllers"

const createApp = (functionName) => {
  const app = express();
  const router = express.Router();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const routerBasePath = `/.netlify/functions/${functionName}`;

  router.use("/ping", routes.getPingRoutes())
  router.use("/stocks", routes.createStocksRoutes())
  router.use("/estimations", routes.getEstimationRoutes())
  router.use("/users", routes.getUserRoutes())

  app.use(routerBasePath, router);

  return app;
};

export default createApp;
