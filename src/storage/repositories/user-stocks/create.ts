import { UserStock } from '~/src/models';

export const add = async (data: any) => {
  return await UserStock.create(data);
};
