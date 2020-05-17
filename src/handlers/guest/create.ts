import { Request, Response } from 'express';
import joi from '@hapi/joi';
import to from 'await-to-js';
import { GuestRepository } from '~/src/storage';

const schema = joi.object({
  householdSize: joi.number().default(1).messages({}),
  daysTillShopping: joi.number().required().min(1).messages({}),
  items: joi
    .array()
    .items({
      name: joi.string().required(),
      quantity: joi.number().min(0),
    })
    .min(1)
    .required()
    .messages({}),
});

export const addGuestStocks = async (req: Request, resp: Response) => {
  const { body } = req;
  const { value, error } = schema.validate(body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return resp.status(422).json({ errors, success: false });
  }

  const { daysTillShopping, items, householdSize } = value;

  const entry = {
    daysTillShopping,
    items,
  };

  const [err, calculation] = await to(
    GuestRepository.addStocks(householdSize, entry)
  );

  if (err) {
    return resp.status(500).json({ error: err.message });
  }

  return resp.status(201).json({ success: true, calculation });
};
