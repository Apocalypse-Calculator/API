import { getOne, getById, getByEmail, getByProviderId } from './get';
import { create } from './create';
import { serialize } from './serialize';

export const UserRepository = {
  getOne,
  getById,
  getByEmail,
  getByProviderId,
  create,
  serialize,
};
