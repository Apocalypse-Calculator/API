import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from '../../core/config';
import bcrypt from 'bcryptjs';
import { UserRepository } from '../../core/storage/repository';

const { jwtSecret } = config;

const setup = () => {
  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UserRepository.getUserById(id);
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  });
};

const signToken = (user) => {
  return jwt.sign({ data: user }, jwtSecret, { expiresIn: '1h' });
};

const decodeToken = async (token) => {
  return await jwt.verify(token, jwtSecret);
};

const hashPassword = async (password) => {
  if (!password) {
    throw new Error('password was not provided');
  }
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const verifyPassword = async (candidate, actual) => {
  return await bcrypt.compare(candidate, actual);
};

const currentUser = async (token) => {
  const result = await decodeToken(token);
  const { data } = result;
  return data;
};

export {
  setup,
  signToken,
  decodeToken,
  hashPassword,
  verifyPassword,
  currentUser,
};
