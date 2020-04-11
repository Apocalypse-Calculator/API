import { Request, Response } from 'express';
import { UserRepository } from '~/src/storage';
import { IUser } from '~/src/models';

export const getCurrentUser = async (req: Request, resp: Response) => {
  return resp.json({ user: UserRepository.serialize(req.user as IUser) });
};
