import { Request } from 'express';
import passport from 'passport';
import passportJWT from 'passport-jwt';
import { to } from 'await-to-js';
import config from '~/src/config';
import { UserRepository } from '~/src/storage';
import { UserSchema } from '~/src/models';

const { jwtSecret } = config;
const { Strategy: JWTStrategy } = passportJWT;

const verifyCallback: passportJWT.VerifyCallbackWithRequest = async (
  _: Request,
  jwtPayload: any,
  done: passportJWT.VerifiedCallback
) => {
  const [err, user] = await to<UserSchema>(
    UserRepository.getById(jwtPayload.data._id)
  );
  if (err) {
    return done(err);
  }
  return done(null, user);
};

const strategy = () => {
  const options: passportJWT.StrategyOptions = {
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
    passReqToCallback: true,
  };

  passport.use(new JWTStrategy(options, verifyCallback));
};

export { strategy };
