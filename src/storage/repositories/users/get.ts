import mongoose from 'mongoose';
import { User } from '~/src/models';

const getOne = async (conditions: any) => {
  return await User.findOne({
    $or: conditions,
  });
};

const getById = async (id: string) => {
  return await User.findById(id);
};

const getByEmail = async (email: string) => {
  return await User.findOne({ email });
};

const getByProviderId = async (providerId: string) => {
  return await User.findOne({ providerId });
};

export { getOne, getById, getByEmail, getByProviderId };
