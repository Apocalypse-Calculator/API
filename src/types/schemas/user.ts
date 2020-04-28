import { Document, Types } from 'mongoose';

export interface Item extends Types.Subdocument {
  name: string;
  quantity: number;
  estimatedDaysRemaining: number;
}

export interface StockEntry extends Types.Subdocument {
  items: Types.DocumentArray<Item>;
  daysTillShopping: number;
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
  stocks: Types.DocumentArray<StockEntry>;
}
