import { model, Schema } from 'mongoose';
import { User as UserSchema, StockEntry } from '~/src/types';

const stockingSchema = new Schema<StockEntry>(
  {
    item: { type: String, ref: 'item_definitions', required: true },
    quantity: { type: Number, required: true },
    daysTillShopping: { type: Number },
    estimatedDaysRemaining: { type: Number },
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
    householdSize: Number,
    location: {
      city: String,
      country: String,
    },
    stockings: [stockingSchema],
  },
  { timestamps: true }
);

export const User = model<UserSchema>('users', schema);
