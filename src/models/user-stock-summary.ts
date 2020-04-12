import { model, Schema, Document } from 'mongoose';
import { UserStockSummarySchema } from '~/src/types';

const collection = 'user_stock_summaries';

const schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    stocks: [
      {
        name: { type: String, required: true },
        quantity: { type: String, required: true },
      },
    ],
    estimates: [
      {
        name: { type: String, required: true },
        daysRemaining: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const UserStockSummary = model<UserStockSummarySchema>(
  collection,
  schema
);
