import { Request, Response } from 'express';
import { signToken } from '~/src/services/auth/auth';
import { IUser } from '~/src/models';
import { UserRepository } from '~/src/storage';

export const facebookCallback = async (req: Request, resp: Response) => {
  const token = signToken(req.user as IUser);
  return resp
    .status(200)
    .set('JWT', token)
    .json({ user: UserRepository.serialize(req.user as IUser) });
};
