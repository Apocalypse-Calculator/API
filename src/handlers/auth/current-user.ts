import { Request, Response } from 'express';

export const getCurrentUser = async (req: Request, resp: Response) => {
  return resp.json({ user: req.user });
};
