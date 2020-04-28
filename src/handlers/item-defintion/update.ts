import { Request, Response } from 'express';
import { to } from 'await-to-js';
import joi from '@hapi/joi';

import { ItemDefinitionRepository } from '~/src/storage/repositories/item-definitions';
import { ItemDefinition } from '~/src/types';

const definitionUpdate = joi.object({
  name: joi.string().min(3).max(50),
  unit: joi.string().min(1).max(50),
  averageConsumption: joi.number(),
});

export const updateDefinition = async (req: Request, resp: Response) => {
  const { body } = req;
  const { value, error } = definitionUpdate.validate(body);
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return resp.status(422).json({ success: false, errors });
  }

  const [err, definition] = await to<ItemDefinition>(
    ItemDefinitionRepository.update(value)
  );
  if (err) {
    return resp.status(422).json({ success: false, error: err.message });
  }
  return resp.status(201).json({ success: true, definition });
};
