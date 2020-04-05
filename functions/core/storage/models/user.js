import { model, Schema } from 'mongoose';

const userCollection = 'users';

const UserSchema = new Schema({
  email: String,
  password: String,
  displayName: String,
  provider: String,
  providerId: String,
  firstName: String,
  lastName: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null },
  confirmedAt: { type: Date, default: null },
  confirmationSentAt: { type: Date, default: null },
});

export const UserModel = model(userCollection, UserSchema);
