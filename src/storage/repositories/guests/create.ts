import { runCalculations } from '~/src/services';
import { Guest } from '~/src/models/guest';

export const addStocks = async (householdSize: number, stocks: any) => {
  const enriched = await runCalculations(stocks, householdSize);
  return await Guest.create(enriched);
};
