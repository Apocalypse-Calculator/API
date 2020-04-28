import { model, Schema } from 'mongoose';
import { User as UserSchema, StockEntry, Item } from '~/src/types';

const itemStockSchema = new Schema<Item>({
  name: { type: String, ref: 'item_definitions', required: true },
  quantity: { type: Number, required: true },
  estimatedDaysRemaining: Number,
});

const entriesSchema = new Schema<StockEntry>(
  {
    items: [itemStockSchema],
    daysTillShopping: { type: Number },
  },
  { timestamps: true }
);

const schema = new Schema<UserSchema>(
  {
    email: String,
    password: String,
    provider: String,
    providerId: String,
    firstName: String,
    lastName: String,
    displayName: String,
    householdSize: { type: Number, default: 1 },
    location: {
      city: String,
      country: String,
    },
    stocks: [entriesSchema],
  },
  { timestamps: true }
);

export const User = model<UserSchema>('users', schema);
