import { getByName } from './get';
import { ItemDefinition } from '~/src/types';
import { ItemDefinition as Model } from '~/src/models';

export const create = async (
  definition: ItemDefinition
): Promise<ItemDefinition> => {
  const existing = await getByName(definition.name);
  if (existing) {
    throw new Error(`An item already exist with name ${definition.name}`);
  }
  return await Model.create(definition);
};

export const update = async (
  definition: ItemDefinition
): Promise<ItemDefinition> => {
  return await Model.findOneAndUpdate(
    { name: definition.name, deleted: false },
    definition,
    { upsert: false, runValidators: true }
  );
};
