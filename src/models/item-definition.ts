import { model, Schema } from 'mongoose';
import { UnitSystem, ItemDefinitionSchema } from '~/src/types';

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
