import passport from 'passport';
import passportFacebook from 'passport-facebook';
import { to } from 'await-to-js';
import config from '~/src/config';
import { UserRepository } from '~/src/storage';
import { User } from '~/src/types';

const { Strategy: FacebookStrategy } = passportFacebook;

const verifyCallback: passportFacebook.VerifyFunction = async (
  accessToken: string,
  refreshToken: string,
  profile: passportFacebook.Profile,
  done
) => {
  const conditions = [
    {
      providerId: profile.id,
    },
    {
      email: profile.emails[0].value,
    },
  ];
  const [err, user] = await to(UserRepository.getOne(conditions));
  // if user already exists just sign them in
  if (err || user) {
    return done(err, user);
  }

  const [createdError, createdUser] = await to<User>(
    UserRepository.create({
      providerId: profile.id,
      provider: profile.provider,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      displayName: profile.displayName,
      email: profile.emails[0].value,
    })
  );
  return done(createdError, createdUser);
};

const strategy = () => {
  const { serverAPIUrl, facebook } = config;
  const { clientID, clientSecret } = facebook;
  const options: passportFacebook.StrategyOption = {
    clientID,
    clientSecret,
    callbackURL: `${serverAPIUrl}/users/auth/facebook/callback`,
    profileFields: ['id', 'emails', 'displayName', 'photos', 'name'],
  };

  passport.use(new FacebookStrategy(options, verifyCallback));
};

export { strategy };
