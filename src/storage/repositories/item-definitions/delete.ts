import { ItemDefinition } from '~/src/models';

export const deleteDefinition = async (id: string) => {
  await ItemDefinition.findByIdAndUpdate(
    id,
    { deleted: false },
    { upsert: false }
  );
};

export const deleteUnit = async (id: string, unitId: string) => {
  await ItemDefinition.findOneAndDelete({ _id: id, 'units._id': unitId });
};
