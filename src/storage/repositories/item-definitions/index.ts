import * as getters from './get';
import { create, update } from './create';
import { deleteDefinition } from './delete';

export const ItemDefinitionRepository = {
  ...getters,
  create,
  update,
  delete: deleteDefinition,
};
