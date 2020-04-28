import { Request, Response } from 'express';
import { User } from '~/src/types';
import { UserRepository } from '~/src/storage';
import moment from 'moment';

export const getLastStockEntry = async (req: Request, resp: Response) => {
  const user = req.user as User;
  const stock = UserRepository.getLatestStockEntry(user);
  return resp.status(200).json({ stock });
};

export const getLatestStockEntries = async (req: Request, resp: Response) => {
  const user = req.user as User;
  const startDate = moment().startOf('day');
  const endDate = moment().endOf('day');
  const stocks = UserRepository.queryStockEntries(user, startDate, endDate);
  return resp.status(200).json({ stocks });
};

export const listStocks = async (req: Request, resp: Response) => {
  const user = req.user as User;
  const { start_date, end_date } = req.query;
  let startDate: moment.Moment;
  let endDate: moment.Moment;

  if (start_date && typeof start_date === 'string') {
    startDate = moment(start_date);
  } else {
    startDate = moment().subtract(1, 'weeks');
  }
  if (end_date && typeof end_date === 'string') {
    endDate = moment(end_date);
  } else {
    endDate = moment().endOf('day');
  }

  const stocks = UserRepository.queryStockEntries(user, startDate, endDate);
  return resp.status(200).json({ stocks });
};
