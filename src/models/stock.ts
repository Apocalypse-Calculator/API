import { Schema } from 'mongoose';
import { Item, StockEntry } from '~/src/types';

export const itemStockSchema = new Schema<Item>({
  name: { type: String, ref: 'item_definitions', required: true },
  quantity: { type: Number, required: true },
  estimatedDaysRemaining: Number,
});

export const entriesSchema = new Schema<StockEntry>(
  {
    items: [itemStockSchema],
    daysTillShopping: { type: Number },
  },
  { timestamps: true }
);
