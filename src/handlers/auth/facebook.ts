import { Request, Response } from 'express';
import { signToken } from '~/src/services/auth/auth';
import { UserSchema } from '~/src/models';
import { UserRepository } from '~/src/storage';

export const facebookCallback = async (req: Request, resp: Response) => {
  const user = req.user as UserSchema;
  const token = signToken(user);
  return resp
    .status(200)
    .set('JWT', token)
    .json({ user: UserRepository.serialize(user) });
};
