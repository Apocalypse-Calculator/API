import { Request, Response } from 'express';
import joi from '@hapi/joi';
import { to } from 'await-to-js';
import { ItemDefinitionRepository } from '~/src/storage/repositories/item-definitions';
import { ItemDefinition } from '~/src/types';

const schema = joi.object({
  name: joi.string().min(3).max(50).required(),
  unit: joi.string().min(1).max(50).required(),
  averageConsumption: joi.number().required(),
});

export const addDefinition = async (req: Request, resp: Response) => {
  const { body } = req;
  const { value, error } = schema.validate(body);
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return resp.status(422).json({ success: false, errors });
  }
  const [err, definition] = await to<ItemDefinition>(
    ItemDefinitionRepository.create(value)
  );
  if (err) {
    return resp.status(422).json({ success: false, error: err.message });
  }
  return resp.status(201).json({ success: true, definition });
};
