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
  if (user.stocks.length > 0) {
    return user.stocks[user.stocks.length - 1];
  }
  return null;
};

const queryStockEntries = (
  user: User,
  startDate: moment.Moment,
  endDate: moment.Moment,
  limit: number = 100
): StockEntry[] => {
  return user.stocks
    .filter((stocking) => {
      return moment(stocking.createdAt).isBetween(startDate, endDate);
    })
    .slice(0, limit);
};

export {
  getOne,
  getById,
  getByEmail,
  getByProviderId,
  getLatestStockEntry,
  queryStockEntries,
};
