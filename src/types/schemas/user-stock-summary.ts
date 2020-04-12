import { Document } from 'mongoose';

export interface UserStockSummarySchema extends Document {
  user: any;
  stocks: any;
  estimates: any;
  createdAt: Date;
  updatedAt?: Date;
}
