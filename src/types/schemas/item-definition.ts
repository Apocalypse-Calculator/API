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
