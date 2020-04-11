import { IItemDefinition, ItemDefinition, Unit } from '~/src/models';
import { getByName } from './get';
import { ItemDefinitionRepository } from '.';

export const create = async (
  definition: IItemDefinition
): Promise<IItemDefinition> => {
  const existing = await getByName(definition.name);
  if (existing) {
    throw new Error(`An item already exist with name ${definition.name}`);
  }
  return await ItemDefinition.create(definition);
};

export const upsert = async (
  definition: IItemDefinition
): Promise<IItemDefinition> => {
  return await ItemDefinition.findOneAndUpdate(
    { name: definition.name, deleted: false },
    definition,
    { upsert: true, runValidators: true }
  );
};

export const addUnit = async (id: string, unit: Unit) => {
  const definition = await ItemDefinitionRepository.get(id);
  if (definition) {
    definition.units.push(unit);
    await definition.save();
    return unit;
  }
};
