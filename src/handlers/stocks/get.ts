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
  const endDate = startDate.add(1, 'days');
  const stocks = UserRepository.queryStockEntries(user, startDate, endDate);
  return resp.status(200).json({ stocks });
};

export const listStocks = async (req: Request, resp: Response) => {
  const user = req.user as User;
  const { start_date, end_date } = req.query;
  const startDate = moment(start_date as string);
  const endDate = moment(end_date as string);
  const stocks = UserRepository.queryStockEntries(user, startDate, endDate);
  return resp.status(200).json({ stocks });
};
