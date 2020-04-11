import { Request, Response } from 'express';
import { to } from 'await-to-js';
import joi from '@hapi/joi';

import { IItemDefinition } from '~/src/models';
import { ItemDefinitionRepository } from '~/src/storage/repositories/item-definitions';

const definitionUpdate = joi.object({
  name: joi.string().min(3).max(50),
  averageConsumption: joi.number(),
});

export const updateDefinition = async (req: Request, resp: Response) => {
  const { body } = req;
  const { value, error } = definitionUpdate.validate(body);
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return resp.status(422).json({ success: false, errors });
  }

  const [err, definition] = await to<IItemDefinition>(
    ItemDefinitionRepository.upsert(value)
  );
  if (err) {
    return resp.status(422).json({ success: false, error: err.message });
  }
  return resp.status(201).json({ success: true, definition });
};
