import { Request, Response } from 'express';
import joi from '@hapi/joi';
import { to } from 'await-to-js';
import { IItemDefinition } from '~/src/models';
import { ItemDefinitionRepository } from '~/src/storage/repositories/item-definitions';

const SYSTEMS = ['metric', 'imperial'];

const schema = joi.object({
  name: joi.string().min(3).max(50).required(),
  units: joi.array().items(
    joi.object({
      system: joi
        .string()
        .valid(...SYSTEMS)
        .required(),
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
  const [err, definition] = await to<IItemDefinition>(
    ItemDefinitionRepository.create(value)
  );
  if (err) {
    return resp.status(422).json({ success: false, error: err.message });
  }
  return resp.status(201).json({ success: true, definition });
};

const unitSchema = joi.object({
  system: joi
    .string()
    .valid(...SYSTEMS)
    .required(),
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
  const [err, unit] = await to(ItemDefinitionRepository.addUnit(id, value));
  if (err) {
    return resp.status(422).json({ success: false, error: err.message });
  }
  if (unit) {
    return resp.status(201).json({ success: true, unit });
  }
  return resp
    .status(404)
    .json({ success: false, error: `definition ${id} not found` });
};
