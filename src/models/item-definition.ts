import { model, Schema } from 'mongoose';
import { ItemDefinition as ItemDefinitionSchema } from '~/src/types';

const collection = 'item_definitions';

const schema = new Schema(
  {
    name: { type: String, required: true },
    unit: { type: String, required: true },
    averageConsumption: { type: Number, required: true },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// can have multiple items but only unique combinations of name / unit
// water L , or water mL for example
schema.index({ name: 1, unit: 1 }, { unique: true });

export const ItemDefinition = model<ItemDefinitionSchema>(collection, schema);
