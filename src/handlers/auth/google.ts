import { Request, Response } from 'express';
import { AuthService } from '~/src/services/auth';
import { UserRepository } from '~/src/storage';
import { User } from '~/src/types';

export const googleCallback = async (req: Request, resp: Response) => {
  const user = req.user as User;
  const token = AuthService.signToken(user);
  return resp
    .status(200)
    .set('JWT', token)
    .json({ user: UserRepository.serialize(user) });
};
