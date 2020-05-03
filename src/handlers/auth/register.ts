import { Request, Response } from 'express';
import joi from '@hapi/joi';
import to from 'await-to-js';
import { User } from '~/src/types';
import { UserRepository } from '~/src/storage';
import { AuthService } from '~/src/services/auth';

const schema = joi.object({
  email: joi.string().email().required().messages({
    'string.email': 'invalid email',
    'string.base': 'invalid email',
    'any.required': 'email is required',
    'string.empty': 'email is required',
  }),
  password: joi.string().required().messages({
    'string.base': 'password should be a string',
    'any.required': 'password is required',
    'string.empty': 'password cant be empty',
  }),
  password_confirm: joi
    .string()
    .required()
    .valid(joi.ref('password'))
    .messages({
      'string.base': 'password confirmation should be a string',
      'any.required': 'password confirmation is required',
      'string.empty': 'password confirmation cant be empty',
      'any.only': 'password does not match password confirmation',
      'any.ref': 'password does not match password confirmation',
    }),
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
    return resp.status(500).json({ success: false, error: err.message });
  }
  return resp
    .status(201)
    .json({ success: true, user: UserRepository.serialize(user) });
};
