import { Request, Response } from 'express';
import joi from '@hapi/joi';
import to from 'await-to-js';
import { User } from '~/src/types';
import { UserRepository } from '~/src/storage';
import { AuthService } from '~/src/services/auth';

const schema = joi.object({
  email: joi.string().email().required(),
  password: joi.string(),
  password_confirm: joi.ref('password'),
  first_name: joi.string().optional(),
  last_name: joi.string().optional(),
  display_name: joi.string().optional(),
  location: joi.object({
    city: joi.string(),
    country: joi.string(),
  }),
});

export const registerUser = async (req: Request, resp: Response) => {
  const { body } = req;

  const { value, error } = schema.validate(body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return resp.status(422).json({ errors, success: false });
  }
  const password = await AuthService.hashPassword(value.password);
  const userData = { ...value, password };
  const [err, user] = await to<User>(UserRepository.create({ ...userData }));
  if (err) {
    return resp.status(422).json({ success: false, error: err.message });
  }
  return resp
    .status(201)
    .json({ success: true, user: UserRepository.serialize(user) });
};
