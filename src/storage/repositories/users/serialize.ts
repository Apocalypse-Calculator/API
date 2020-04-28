import { User } from '~/src/types';

export const serialize = (user: User) => {
  const obj = user.toObject({ versionKey: false });
  obj.id = user._id;
  delete obj.password;
  delete obj._id;
  return obj;
};
