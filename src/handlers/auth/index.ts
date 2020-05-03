import { Router } from 'express';
import { registerUser } from './register';
import { login } from './login';
import passport from 'passport';
import { getCurrentUser } from './current-user';
import { facebookCallback } from './facebook';
import { googleCallback } from './google';

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

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  googleCallback
);
export default router;
