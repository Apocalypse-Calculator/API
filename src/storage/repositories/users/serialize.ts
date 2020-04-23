import { UserSchema } from '~/src/models';

export const serialize = (user: UserSchema) => {
  const obj = user.toObject({ versionKey: false });
  obj.id = user._id;
  delete obj.password;
  delete obj._id;
  return obj;
};
