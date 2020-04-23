import { Request, Response } from 'express';
import to from 'await-to-js';
import { UserStockSchema, UserSchema } from '~/src/models';
import { UserStockRepository } from '~/src/storage/repositories/user-stocks';

export const getLatestReport = async (req: Request, resp: Response) => {
  const user = req.user as UserSchema;
  const [err, levels] = await to<UserStockSchema>(
    UserStockRepository.getLatestLevels(user._id)
  );
  if (err) {
    return resp.status(422).json({ error: err.message });
  }
  return resp.status(200).json({ levels });
};
