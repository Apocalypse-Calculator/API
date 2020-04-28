import joi from '@hapi/joi';
import { Request, Response } from 'express';
import { User } from '~/src/types';
import { UserRepository } from '~/src/storage/repositories';
import { to } from 'await-to-js';

const schema = joi.object({
  items: joi
    .array()
    .items({
      name: joi.string().required(),
      quantity: joi.number().min(0),
    })
    .min(1),
  daysTillShopping: joi.number().min(0),
});

export const addStocks = async (req: Request, resp: Response) => {
  const user = req.user as User;
  const { body } = req;
  const { value, error } = schema.validate(body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return resp.status(422).json({ errors, success: false });
  }
  const [err, _] = await to(UserRepository.addStockEntry(user, value));
  if (err) {
    return resp.status(500).json({ error: err.message, success: false });
  }
  return resp.status(201).json({ success: true });
};
