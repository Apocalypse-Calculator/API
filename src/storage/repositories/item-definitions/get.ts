import { ItemDefinition, IItemDefinition } from '~/src/models';

export const getAll = async (): Promise<IItemDefinition[]> => {
  return await ItemDefinition.find({ deleted: false });
};

export const get = async (id: string): Promise<IItemDefinition> => {
  return await ItemDefinition.findOne({ _id: id, deleted: false });
};

export const getByName = async (name: string): Promise<IItemDefinition> => {
  return await ItemDefinition.findOne({ name, deleted: false });
};

export const getUnit = async (definitionId: string, unitId: string) => {
  const definition = await ItemDefinition.findOne({
    _id: definitionId,
    'units._id': unitId,
  });
  if (definition) {
    return definition.units[0];
  }
};
