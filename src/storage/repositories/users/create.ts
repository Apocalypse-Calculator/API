import { User, StockEntry } from '~/src/types';
import { User as Model } from '~/src/models';

export const create = async (options: any) => {
  return await Model.create(options);
};

export const addStockEntry = async (user: User, options: StockEntry) => {
  user.stock_entries.push(options);
};
