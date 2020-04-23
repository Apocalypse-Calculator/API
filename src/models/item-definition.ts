import { model, Schema } from 'mongoose';
import { Document } from 'mongoose';

export enum UnitSystem {
  METRIC = 'metric',
  IMPERIAL = 'imperial',
}

export interface UnitSchema extends Document {
  system: UnitSystem;
  name: string;
}

export interface ItemDefinitionSchema extends Document {
  name: string;
  units: UnitSchema[];
  averageConsumption: number;
  deleted: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

const collection = 'item_definitions';

const unitSchema = new Schema(
  {
    system: {
      type: String,
      enum: Object.values(UnitSystem),
    },
    name: String,
  },
  { timestamps: true }
);

const schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    units: [unitSchema],
    averageConsumption: { type: Number, required: true },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ItemDefinition = model<ItemDefinitionSchema>(collection, schema);
