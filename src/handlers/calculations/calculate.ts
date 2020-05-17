import { Request, Response } from 'express';
import joi from '@hapi/joi';
import { calculate } from '~/src/services';
import { to } from 'await-to-js';

interface CalculationResult {
  daysRemaining: number;
}

const schema = joi.object({
  numPeopleUsage: joi.number().default(1).messages({}),
  daysTillShopping: joi.number().required().min(1).messages({}),
  item: joi
    .object({
      name: joi.string().required(),
      quantity: joi.number().min(1),
    })
    .required(),
});

export const newCalculation = async (req: Request, resp: Response) => {
  const { body } = req;
  const { value, error } = schema.validate(body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return resp.status(422).json({ errors, success: false });
  }
  const { item, numPeopleUsage, daysTillShopping } = value;
  const [err, calculation] = await to(
    calculate(item, numPeopleUsage, daysTillShopping)
  );
  if (err) {
    return resp.status(500).json({ error: err.message });
  }
  return resp.status(200).json({ calculation });
};
