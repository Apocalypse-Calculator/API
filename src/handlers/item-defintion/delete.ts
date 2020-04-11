import { Request, Response } from 'express';
import { ItemDefinitionRepository } from '~/src/storage/repositories/item-definitions';
import to from 'await-to-js';

export const deleteDefinition = async (req: Request, resp: Response) => {
  const { id } = req.params;
  const [err, _] = await to(ItemDefinitionRepository.delete(id));
  if (err) {
    return resp.status(500).json({ error: err.message });
  }
  return resp.status(200).end();
};

export const deleteDefinitionUnit = async (req: Request, resp: Response) => {
  const { id, unitId } = req.params;
  const [err, _] = await to(ItemDefinitionRepository.deleteUnit(id, unitId));
  if (err) {
    return resp.status(500).json({ error: err.message });
  }
  return resp.status(200).end();
};
