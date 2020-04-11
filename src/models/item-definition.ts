import { model, Schema, Document } from 'mongoose';

const collection = 'item_definitions';

export interface IItemDefinition extends Document {
  name: string;
  type: string;
  units: string;
  averageConsumption: number;
  createdAt: Date;
  updatedAt?: Date;
}

const schema = new Schema({
  name: String,
  type: String,
  units: String,
  averageConsumption: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null },
});

export const ItemDefinition = model<Document>(collection, schema);
