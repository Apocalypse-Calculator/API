import { User, StockEntry, Item } from '~/src/types';
import { User as Model } from '~/src/models';
import { ItemDefinitionRepository } from '../item-definitions';

export const create = async (options: any) => {
  return await Model.create(options);
};

export const addStockEntry = async (user: User, entry: StockEntry) => {
  const enriched = await addCalculations(entry, user.householdSize);
  user.stocks.push(enriched);
  await user.save();
};

const addCalculations = async (entry: StockEntry, householdSize: number) => {
  const names: string[] = [];
  const itemsByName = entry.items.reduce((obj, item) => {
    names.push(item['name']);
    return {
      ...obj,
      [item['name']]: item,
    };
  }, {});

  const definitions = await ItemDefinitionRepository.queryByNames(names);
  if (!definitions) {
    throw new Error('no item definitions found.');
  }
  const items = Object.keys(itemsByName).map((name) => {
    const item: Item = itemsByName[name];
    const definition = definitions.find(
      (definition) => definition.name === name
    );
    if (!definition) {
      throw new Error(`no definition found for item name ${name}`);
    }
    item.estimatedDaysRemaining = Math.round(
      item.quantity / definition.averageConsumption / householdSize
    );
    return item;
  });
  return { ...entry, items };
};
