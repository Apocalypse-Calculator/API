import passport from 'passport';
import {
  Strategy as TwitterStrategy,
  IStrategyOptionBase,
  Profile,
} from 'passport-twitter';
import config from '~/src/config';
import { to } from 'await-to-js';
import { User } from '~/src/types';
import { UserRepository } from '~/src/storage';

const verifyCallback = async (
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: (error: any, user?: any) => void
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

export const strategy = () => {
  const { twitter, serverAPIUrl } = config;
  const { consumerKey, consumerSecret } = twitter;
  const options: IStrategyOptionBase = {
    consumerKey,
    consumerSecret,
    callbackURL: `${serverAPIUrl}/users/auth/twitter/callback`,
  };
  passport.use(new TwitterStrategy(options, verifyCallback));
};
