import passport from 'passport';
import passportFacebook from 'passport-facebook';
import config from '../../../core/config';
import { to } from 'await-to-js';
import { UserRepository } from '../../../core/storage';

const { Strategy: FacebookStrategy } = passportFacebook.Strategy;

const verifyCallback = async (accessToken, refreshToken, profile, done) => {
  const [err, user] = await to(UserRepository.getUserByProviderId(profile.id));
  // just log a user we already register, other wise resolve the error
  if (err || user) {
    return done(err, user);
  }

  const [createdError, createdUser] = await to(
    UserRepository.createUser({
      providerId: profile.id,
      provider: profile.provider,
      displayName: profile.displayName,
      email: profile.emails[0].value,
    })
  );
  return done(createdError, createdUser);
};

const strategy = () => {
  const { serverAPIUrl, facebook } = config;
  const { clientID, clientSecret } = facebook;
  const options = {
    clientID,
    clientSecret,
    callbackURL: `${serverAPIUrl}/users/auth/facebook/callback`,
    profileFields: ['id', 'emails', 'displayName', 'photos', 'name'],
  };

  passport.use(new FacebookStrategy(options, verifyCallback));
};

export { strategy };
