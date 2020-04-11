import { model, Schema, Document } from 'mongoose';

const collection = 'user_stock_summaries';

export interface IUserStockSummary extends Document {
  user: any;
  stocks: any;
  estimates: any;
  createdAt: Date;
  updatedAt?: Date;
}

const schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  stocks: [{ type: Schema.Types.ObjectId, ref: 'user_items' }],
  estimates: [],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null },
});

export const UserStockSummary = model<IUserStockSummary>(collection, schema);
