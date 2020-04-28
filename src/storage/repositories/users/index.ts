import * as Get from './get';
import * as Create from './create';
import { serialize } from './serialize';

export const UserRepository = {
  ...Get,
  ...Create,
  serialize,
};
