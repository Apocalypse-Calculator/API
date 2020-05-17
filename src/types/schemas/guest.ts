import { Document, Types } from 'mongoose';
import { Location, StockEntry } from './user';

export interface Guest extends Document {
  householdSize: number;
  location?: Location;
  stocks: Types.DocumentArray<StockEntry>;
}

interface StockOption {
  name: string;
  quantity: number;
  estimatedDaysRemaining: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateGuestOptions {
  householdSize?: number;
  stocks: StockEntry[];
}
