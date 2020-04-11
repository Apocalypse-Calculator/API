import { model, Schema, Document } from 'mongoose';

const collection = 'user_stocks';

export interface IUserStock extends Document {
  definition: any;
  user: any;
  amount: number;
  createdAt: Date;
  updatedAt?: Date;
}

const schema = new Schema({
  definition: {
    type: Schema.Types.ObjectId,
    ref: 'item_definitions',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  amount: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null },
});

export const UserStock = model<IUserStock>(collection, schema);
