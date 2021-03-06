import { Application } from 'express';
import * as AuthService from './auth';
import * as strategies from './strategies';

const initAuthentication = (app: Application) => {
  AuthService.setup();
  strategies.JWTStrategy();
  strategies.FacebookStrategy();
  strategies.GoogleStrategy();
  strategies.TwitterStrategy();
};

export { AuthService, strategies, initAuthentication };
