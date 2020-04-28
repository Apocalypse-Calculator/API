import { Document, Types } from 'mongoose';

export interface StockEntry extends Types.Subdocument {
  item: string;
  quantity: number;
  daysTillShopping: number;
  estimatedDaysRemaining: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Location {
  city: string;
  country: string;
}

export interface User extends Document {
  email: string;
  password: string;
  provider: string;
  providerId: string;
  firstName: string;
  lastName: string;
  displayName: string;
  householdSize: number;
  location: Location;
  createdAt: Date;
  updatedAt?: Date;
  stock_entries: Types.DocumentArray<StockEntry>;
}
