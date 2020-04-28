import { get, getAll, getByName } from './get';
import { create, update } from './create';
import { deleteDefinition } from './delete';

export const ItemDefinitionRepository = {
  get,
  getAll,
  getByName,
  create,
  update,
  delete: deleteDefinition,
};
