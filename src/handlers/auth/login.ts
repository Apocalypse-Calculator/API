import { Request, Response } from 'express';
import joi from '@hapi/joi';
import to from 'await-to-js';
import { User } from '~/src/types';
import { UserRepository } from '~/src/storage';
import { AuthService } from '~/src/services/auth';

const schema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export const login = async (req: Request, resp: Response) => {
  const { body } = req;
  const { value, error } = schema.validate(body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return resp.status(422).json({ success: false, errors });
  }
  const { email, password } = value;
  const [err, user] = await to<User>(UserRepository.getByEmail(email));
  if (err) {
    return resp.status(422).json({ success: false, error: err.message });
  }

  const isValidPassword = await AuthService.verifyPassword(
    password,
    user.password
  );

  if (isValidPassword) {
    await req.login(user, (err) => {
      if (err) {
        return resp.status(422).json({ success: false, error: err.message });
      }
    });

    const token = AuthService.signToken(user);
    return resp
      .status(200)
      .set('JWT', token)
      .json({ success: true, user: UserRepository.serialize(user) });
  }

  return resp.status(401).json({
    success: false,
    error: 'authentication failed, wrong credentials',
  });
};
