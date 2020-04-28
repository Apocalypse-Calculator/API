import { ItemDefinition as Model } from '~/src/models';
import { ItemDefinition } from '~/src/types';

export const getAll = async (): Promise<ItemDefinition[]> => {
  return await Model.find({ deleted: false });
};

export const get = async (id: string): Promise<ItemDefinition> => {
  return await Model.findOne({ _id: id, deleted: false });
};

export const getByName = async (name: string): Promise<ItemDefinition> => {
  return await Model.findOne({ name, deleted: false });
};

export const queryByNames = async (
  names: string[]
): Promise<ItemDefinition[]> => {
  return await Model.find({ name: { $in: names } });
};
