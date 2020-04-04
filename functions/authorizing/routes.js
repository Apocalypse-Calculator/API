import joi from '@hapi/joi';
import _ from 'lodash';
import { utils } from './service';
import { UserRepository, getConnection } from '../core/storage';
import { verifyPassword, signToken, currentUser } from './service/utils';

const schema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
  displayName: joi.string(),
  location: joi.object({
    city: joi.string(),
    country: joi.string(),
  }),
});

const transformUser = (user) => {
  delete user.password;
  delete user.__v;
  delete user._id;
  return user;
};

export const registerUser = async (req, resp) => {
  const { body } = req;
  await getConnection();
  try {
    const { value, error } = schema.validate(body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      resp.status(422);
      resp.json({
        errors,
      });
    } else {
      const { email, password, displayName, location } = value;
      const user = await UserRepository.createUser({
        email,
        password: await utils.hashPassword(password),
        displayName,
        location,
      });

      if (user.error) {
        resp.status(422);
        resp.json({ error: user.error });
      } else {
        resp.status(201);
        resp.json({ user: transformUser(user.toObject()) });
      }
    }
  } catch (err) {
    console.log(err);
    resp.status(500);
  }
};

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export const loginUser = async (req, resp) => {
  const { body } = req;

  try {
    await getConnection();
    const { value, error } = loginSchema.validate(body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((entry) => entry.message);
      resp.status(422);
      resp.json({ success: false, errors });
    } else {
      const { email, password } = value;

      const user = await UserRepository.getUserByEmail(email);
      const isValidPassword = await verifyPassword(password, user.password);

      if (isValidPassword) {
        await req.login(user, { session: false });
        const token = signToken(user);
        resp.status(200);
        resp.set('JWT', token);
        resp.json({ success: true, user: transformUser(user.toObject()) });
      } else {
        resp.status(401);
        resp.json({ success: false, error: 'invalid credentials' });
      }
    }
  } catch (err) {
    resp.status(500);
    resp.json({ err });
  }
};

export const getCurrentUser = async (req, resp) => {
  try {
    await getConnection();
    const jwt = req.header('JWT');
    if (jwt) {
      let user = await currentUser(jwt);
      delete user.password;
      resp.status(200);
      resp.json({ user });
    } else {
      resp.status(400);
      resp.json({ error: 'token missing' });
    }
  } catch (err) {
    resp.status(500);
    resp.json({ error: err.message });
  }
};
