import passport from 'passport';
import passportJWT from 'passport-jwt';
import config from '../../../core/config';
import { UserRepository } from '../../../core/storage';
import { signToken } from '../utils';

const { jwtSecret } = config;
const { Strategy: JWTStrategy } = passportJWT;

const verifyCallback = async (req, jwtPayload, cb) => {
  try {
    const user = await UserRepository.getUserById(jwtPayload.data.id);
    return cb(null, user);
  } catch (err) {
    return cb(err);
  }
};

const strategy = () => {
  const options = {
    jwtFromRequest: (req) => req.cookies.jwt,
    secretOrKey: jwtSecret,
    passReqToCallback: true,
  };
  passport.use(new JWTStrategy(options, verifyCallback));
};

const login = async (req, user) => {
  await req.login(user, { session: false });
  return signToken(user);
};

export { strategy, login };
