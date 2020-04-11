import { model, Schema, Document } from 'mongoose';

const collection = 'user_stock_summaries';

export interface IUserStockSummary extends Document {
  user: any;
  stocks: any;
  estimates: any;
  createdAt: Date;
  updatedAt?: Date;
}

const schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    stocks: [{ type: Schema.Types.ObjectId, ref: 'user_stocks' }],
    estimates: [],
  },
  { timestamps: true }
);

export const UserStockSummary = model<IUserStockSummary>(collection, schema);
