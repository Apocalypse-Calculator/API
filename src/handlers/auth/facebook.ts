import { Request, Response } from 'express';
import { signToken } from '~/src/services/auth/auth';
import { User } from '~/src/types';
import { UserRepository } from '~/src/storage';

export const facebookCallback = async (req: Request, resp: Response) => {
  const user = req.user as User;
  const token = signToken(user);
  return resp
    .status(200)
    .set('JWT', token)
    .json({ user: UserRepository.serialize(user) });
};
