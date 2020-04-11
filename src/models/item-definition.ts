import { model, Schema, Document } from 'mongoose';

const collection = 'item_definitions';

export interface Unit {
  system: 'metric' | 'imperial';
  name: string;
}

export interface IItemDefinition extends Document {
  name: string;
  units: Unit[];
  averageConsumption: number;
  deleted: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

const schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    units: [
      {
        system: { type: String, required: true },
        name: String,
      },
    ],
    averageConsumption: { type: Number, required: true },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ItemDefinition = model<IItemDefinition>(collection, schema);
