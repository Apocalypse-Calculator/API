import { get, getAll, getByName, getUnit } from './get';
import { create, upsert, addUnit } from './create';
import { deleteDefinition, deleteUnit } from './delete';

export const ItemDefinitionRepository = {
  get,
  getAll,
  getByName,
  getUnit,
  create,
  addUnit,
  upsert,
  delete: deleteDefinition,
  deleteUnit,
};
