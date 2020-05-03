import passport from 'passport';
import {
  OAuth2Strategy,
  Profile,
  VerifyFunction,
  IOAuth2StrategyOption,
} from 'passport-google-oauth';
import config from '~/src/config';
import { to } from 'await-to-js';
import { UserRepository } from '~/src/storage';
import { User } from '~/src/types';

const verifyCallback = async (
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyFunction
) => {
  console.log(profile);
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
      first_name: profile.name.givenName,
      last_name: profile.name.familyName,
      display_name: profile.displayName,
      email: profile.emails[0].value,
    })
  );
  return done(createdError, createdUser);
};

const strategy = () => {
  const { serverAPIUrl, google } = config;
  const { clientID, clientSecret } = google;

  const options: IOAuth2StrategyOption = {
    clientID,
    clientSecret,
    callbackURL: `${serverAPIUrl}/users/auth/google/callback`,
  };

  passport.use(new OAuth2Strategy(options, verifyCallback));
};

export { strategy };
