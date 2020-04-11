import { Request, Response } from 'express';
import { ItemDefinitionRepository } from '~/src/storage/repositories/item-definitions';
import to from 'await-to-js';
import { IItemDefinition } from '~/src/models';

export const listDefinitions = async (req: Request, resp: Response) => {
  const definitions = await ItemDefinitionRepository.getAll();
  return resp.status(200).json({ definitions });
};

export const getDefinition = async (req: Request, resp: Response) => {
  const { id } = req.params;
  const [err, definition] = await to<IItemDefinition>(
    ItemDefinitionRepository.get(id)
  );

  if (err) {
    return resp.status(500).end();
  }

  if (definition) {
    return resp.status(200).json({ definition });
  }

  return resp
    .status(404)
    .json({ error: `could not find definition with id ${id}` });
};

export const listDefinitionUnits = async (req: Request, resp: Response) => {
  const { id } = req.params;
  const [err, definition] = await to<IItemDefinition>(
    ItemDefinitionRepository.get(id)
  );

  if (err) {
    return resp.status(500).json({ error: err.message });
  }

  if (definition) {
    return resp.status(200).json({ units: definition.units });
  }

  return resp
    .status(404)
    .json({ error: `could not find definition with id ${id}` });
};

export const getDefinitionUnit = async (req: Request, resp: Response) => {
  const { id, unitId } = req.params;
  const [err, unit] = await to(ItemDefinitionRepository.getUnit(id, unitId));
  if (err) {
    return resp.status(422).json({ error: err.message });
  }
  if (unit) {
    return resp.status(200).json({ unit });
  }
  return resp
    .status(404)
    .json({ error: `could not find a unit ${unitId} for definition ${id}` });
};
