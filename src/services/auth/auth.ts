import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from '~/src/config';
import bcrypt from 'bcryptjs';
import { UserRepository } from '~/src/storage';
import { IUser } from '~/src/models';
import { to } from 'await-to-js';

interface TokenContent {
  data: IUser;
}

const { jwtSecret } = config;

const setup = () => {
  passport.serializeUser((user: IUser, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id: string, done) => {
    const [err, user] = await to(UserRepository.getById(id));
    if (err) {
      return done(err, null);
    }
    done(null, user);
  });
};

const signToken = (user: IUser): string => {
  const content: TokenContent = { data: user };
  return jwt.sign(content, jwtSecret, { expiresIn: '1h' });
};

const decodeToken = async (token: string) => {
  return jwt.verify(token, jwtSecret);
};

const hashPassword = async (password: string) => {
  if (!password) {
    throw new Error('password can not be empty');
  }
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const verifyPassword = async (candidate: string, actual: string) => {
  return await bcrypt.compare(candidate, actual);
};

const currentUser = async (token) => {
  const { data } = (await decodeToken(token)) as TokenContent;
  return data;
};

export {
  setup,
  signToken,
  decodeToken,
  hashPassword,
  currentUser,
  verifyPassword,
};
