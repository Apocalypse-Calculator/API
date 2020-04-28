import { User as Model } from '~/src/models';
import { User, StockEntry } from '~/src/types';
import moment from 'moment';

const getOne = async (conditions: any) => {
  return await Model.findOne({
    $or: conditions,
  });
};

const getById = async (id: string) => {
  return await Model.findById(id);
};

const getByEmail = async (email: string) => {
  return await Model.findOne({ email });
};

const getByProviderId = async (providerId: string) => {
  return await Model.findOne({ providerId });
};

const getLatestStockEntry = (user: User): StockEntry => {
  if (user.stock_entries.length > 0) {
    return user.stock_entries[user.stock_entries.length - 1];
  }
  return null;
};

const queryStockEntries = (
  user: User,
  startDate: moment.Moment,
  endDate: moment.Moment
): StockEntry[] => {
  return user.stock_entries.filter((stocking) => {
    return moment(stocking.createdAt).isBetween(startDate, endDate);
  });
};

export {
  getOne,
  getById,
  getByEmail,
  getByProviderId,
  getLatestStockEntry,
  queryStockEntries,
};
