import { model, Schema, Document } from 'mongoose';

const collection = 'users';

export interface IUserLocation {
  city: string;
  country: string;
}

export interface IUser extends Document {
  email: string;
  password: string;
  provider: string;
  providerId: string;
  firstName: string;
  lastName: string;
  displayName: string;
  householdSize: number;
  location: IUserLocation;
  createdAt: Date;
  updatedAt?: Date;
}

const schema = new Schema(
  {
    email: String,
    password: String,
    provider: String,
    providerId: String,
    firstName: String,
    lastName: String,
    displayName: String,
    householdSize: Number,
    location: {
      city: String,
      country: String,
    },
  },
  { timestamps: true }
);

export const User = model<IUser>(collection, schema);
