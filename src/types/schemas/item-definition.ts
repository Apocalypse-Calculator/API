import { Document } from 'mongoose';

export interface ItemDefinition extends Document {
  name: string;
  unit: string;
  averageConsumption: number;
  deleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
