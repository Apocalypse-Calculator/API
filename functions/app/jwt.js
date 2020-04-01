import passport from 'passport';
import passportJWT from 'passport-jwt';

const { Strategy: JWTStrategy } = passportJWT;

const strategy = () => {
  const options = {
    jwtFromRequest: req => req.cookies.jwt,
    secretOrKey: process.env.JWT_SECRET,
    passReqToCallBack: true,
  };

  const verifyCallback = async (req, jwtPayload, cb) => {};

  passport.use(new JWTStrategy(options, verifyCallback));
};

export { strategy };
