import { Router } from 'express';
import { registerUser } from './register';
import { login } from './login';
import passport from 'passport';
import { getCurrentUser } from './current-user';
import { facebookCallback } from './facebook';

const router = Router();
router.post('/register', registerUser);
router.post('/login', login);
router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  getCurrentUser
);
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
  facebookCallback
);
export default router;
