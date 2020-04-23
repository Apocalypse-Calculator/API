import joi from '@hapi/joi';
import { Request, Response } from 'express';
import { UserSchema, UserStockSchema } from '~/src/models';
import { UserStockRepository } from '~/src/storage/repositories/user-stocks';
import { to } from 'await-to-js';

const schema = joi.object({
  stocks: joi
    .array()
    .items({
      item: joi.string().required(),
      unit: joi.string().required(),
      quantity: joi.number().min(0),
    })
    .min(1),
});

export const addStocks = async (req: Request, resp: Response) => {
  const user = req.user as UserSchema;
  const { body } = req;
  const { value, error } = schema.validate(body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return resp.status(422).json({ errors, success: false });
  }
  const [err, summary] = await to<UserStockSchema>(
    UserStockRepository.add(value)
  );
  if (err) {
    return resp.status(500).json({ error: err.message, success: false });
  }
  return resp.status(201).json({ summary, success: true });
};
