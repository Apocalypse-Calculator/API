import { UserStockSchema, UserStock } from '~/src/models';

export const getLatestLevels = async (
  userId: string
): Promise<UserStockSchema> => {
  const stocks = await UserStock.find({ user: userId })
    .sort({ _id: -1 })
    .limit(1);
  if (stocks) return stocks[0];
  throw new Error(`no stocks found for user ${userId}`);
};
