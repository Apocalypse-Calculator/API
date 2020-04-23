import { Request, Response } from 'express';
import joi from '@hapi/joi';
import { to } from 'await-to-js';
import { ItemDefinitionRepository } from '~/src/storage/repositories/item-definitions';
import { ItemDefinitionSchema } from '~/src/models';

const schema = joi.object({
  name: joi.string().min(3).max(50).required(),
  units: joi.array().items(
    joi.object({
      system: joi.string().required(),
      name: joi.string().min(1).max(50).required(),
    })
  ),
  averageConsumption: joi.number().required(),
});

export const addDefinition = async (req: Request, resp: Response) => {
  const { body } = req;
  const { value, error } = schema.validate(body);
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return resp.status(422).json({ success: false, errors });
  }
  const [err, definition] = await to<ItemDefinitionSchema>(
    ItemDefinitionRepository.create(value)
  );
  if (err) {
    return resp.status(422).json({ success: false, error: err.message });
  }
  return resp.status(201).json({ success: true, definition });
};

const unitSchema = joi.object({
  system: joi.string().required(),
  name: joi.string().min(1).max(50).required(),
});

export const addDefinitionUnit = async (req: Request, resp: Response) => {
  const { id } = req.params;
  const { body } = req;
  const { value, error } = unitSchema.validate(body);
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return resp.status(422).json({ success: false, errors });
  }
  const [err] = await to(ItemDefinitionRepository.addUnit(id, value));
  if (err) {
    return resp.status(422).json({ success: false, error: err.message });
  }
  return resp.status(201).json({ success: true });
};
