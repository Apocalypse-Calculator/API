import { model, Schema } from 'mongoose';
import { User as UserSchema, StockEntry, Item } from '~/src/types';
import { entriesSchema } from './stock';

const schema = new Schema<UserSchema>(
  {
    email: { type: String, required: true, unique: true },
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
