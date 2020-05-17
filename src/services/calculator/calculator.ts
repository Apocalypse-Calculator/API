import { StockEntry, Item } from '~/src/types';
import { ItemDefinitionRepository } from '~/src/storage/repositories';

export const calculate = async (
  item: any,
  peopleCount: number,
  daysTillShopping: number
) => {
  const { name, quantity } = item;
  const definition = await ItemDefinitionRepository.getByName(name);
  if (!definition) {
    throw new Error(`no item definition found for name ${name}`);
  }

  console.log(item, peopleCount, daysTillShopping, definition);
  const estimatedDaysToLast = Math.round(
    quantity / (definition.averageConsumption * peopleCount)
  );

  const estimatedDaysToShop = estimatedDaysToLast - daysTillShopping;
  return {
    estimatedDaysToLast,
    estimatedDaysToShop,
  };
};

export const runCalculations = async (
  entry: StockEntry,
  householdSize: number
) => {
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
