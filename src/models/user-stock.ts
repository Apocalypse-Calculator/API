import { model, Schema, Document } from 'mongoose';

const collection = 'user_stocks';

export interface StockSchema extends Document {
  item: string;
  unit: string;
  quantity: number;
}

export interface EstimateSchema extends Document {
  item: string;
  daysRemaining: number;
}

export interface UserStockSchema extends Document {
  user: string;
  stocks: StockSchema[];
  estimates: EstimateSchema[];
  createdAt?: Date;
  updatedAt?: Date;
}

const stockSchema = new Schema({
  item: { type: Schema.Types.ObjectId, required: true },
  unit: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const estimateSchema = new Schema({
  item: { type: Schema.Types.ObjectId },
  daysRemaining: Number,
});

const schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    stocks: [stockSchema],
    estimates: [estimateSchema],
  },
  { timestamps: true }
);

export const UserStock = model<UserStockSchema>(collection, schema);
