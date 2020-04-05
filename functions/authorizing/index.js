import express, { Router } from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import {
  registerUser,
  loginUser,
  getCurrentUser,
  authFacebookCallback,
} from './routes';
import config from '../core/config';
import { initAuthentication } from './service';
import { getConnection } from '../core/storage';

const createApp = async (functionName) => {
  const app = express();
  const router = Router();

  await getConnection();
  initAuthentication(app);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());

  const routerBasePath = `${config.basePath}/${functionName}`;
  router.post('/register', registerUser);
  router.post('/login', loginUser);
  router.get('/me', getCurrentUser);
  router.get(
    '/auth/facebook',
    passport.authenticate('facebook', {
      session: false,
      scope: ['email'],
    })
  );
  router.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', {
      session: false,
      scope: ['email'],
    }),
    authFacebookCallback
  );
  app.use(passport.initialize());
  app.use(routerBasePath, router);
  return app;
};

export default createApp;
