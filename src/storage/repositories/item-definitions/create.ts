import { ItemDefinition } from '~/src/models';
import { getByName } from './get';
import { ItemDefinitionRepository } from '.';
import { ItemDefinitionSchema, UnitSchema } from '~/src/types';

export const create = async (
  definition: ItemDefinitionSchema
): Promise<ItemDefinitionSchema> => {
  const existing = await getByName(definition.name);
  if (existing) {
    throw new Error(`An item already exist with name ${definition.name}`);
  }
  return await ItemDefinition.create(definition);
};

export const upsert = async (
  definition: ItemDefinitionSchema
): Promise<ItemDefinitionSchema> => {
  return await ItemDefinition.findOneAndUpdate(
    { name: definition.name, deleted: false },
    definition,
    { upsert: true, runValidators: true }
  );
};

export const addUnit = async (id: string, unit: UnitSchema) => {
  const definition = await ItemDefinition.findById(id);
  if (definition) {
    definition.units.push(unit);
    await definition.save();
  } else {
    throw new Error(`definition ${id} does not exit`);
  }
};
