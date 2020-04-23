import { ItemDefinition } from '~/src/models';
import { ItemDefinitionSchema, UnitSchema } from '~/src/models';

export const getAll = async (): Promise<ItemDefinitionSchema[]> => {
  return await ItemDefinition.find({ deleted: false });
};

export const get = async (id: string): Promise<ItemDefinitionSchema> => {
  return await ItemDefinition.findOne({ _id: id, deleted: false });
};

export const getByName = async (
  name: string
): Promise<ItemDefinitionSchema> => {
  return await ItemDefinition.findOne({ name, deleted: false });
};

export const getUnit = async (
  definitionId: string,
  unitId: string
): Promise<UnitSchema> => {
  const definition = await ItemDefinition.findOne({
    _id: definitionId,
    'units._id': unitId,
  });
  if (definition) {
    return definition.units[0];
  }
  throw new Error(
    `definition ${definitionId} does not have a unit with id ${unitId}`
  );
};
