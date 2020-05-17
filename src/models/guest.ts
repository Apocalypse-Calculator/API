import { model, Schema } from 'mongoose';
import { Guest as GuestSchema } from '~/src/types';
import { entriesSchema } from './stock';

const schema = new Schema<GuestSchema>(
  {
    daysTillShopping: { type: Number, required: true },
    householdSize: { type: Number, default: 1 },
    stocks: [entriesSchema],
  },
  { timestamps: true }
);

export const Guest = model<GuestSchema>('guests', schema);
