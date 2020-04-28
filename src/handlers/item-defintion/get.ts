import { Request, Response } from 'express';
import { ItemDefinitionRepository } from '~/src/storage/repositories/item-definitions';
import to from 'await-to-js';
import { ItemDefinition } from '~/src/types';

export const listDefinitions = async (req: Request, resp: Response) => {
  const definitions = await ItemDefinitionRepository.getAll();
  return resp.status(200).json({ definitions });
};

export const getDefinition = async (req: Request, resp: Response) => {
  const { id } = req.params;
  const [err, definition] = await to<ItemDefinition>(
    ItemDefinitionRepository.get(id)
  );

  if (err) {
    return resp.status(500).json({ success: 'failure', error: err.message });
  }

  if (definition) {
    return resp.status(200).json({ definition });
  }

  return resp
    .status(404)
    .json({ error: `could not find definition with id ${id}` });
};
